import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET || !sig) {
    // Dev mode: parse body directly
    try {
      const event = JSON.parse(body) as Stripe.Event;
      await handleStripeEvent(event);
      return NextResponse.json({ received: true });
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  await handleStripeEvent(event);
  return NextResponse.json({ received: true });
}

async function handleStripeEvent(event: Stripe.Event) {
  const supabase = await createClient();

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription & { current_period_end?: number };
      const userId = subscription.metadata?.supabase_user_id;
      if (!userId) break;

      const isActive = ["active", "trialing"].includes(subscription.status);
      const plan = (subscription.metadata?.billing_cycle as "monthly" | "yearly") ?? "monthly";
      const periodEnd = subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null;

      await supabase.from("subscriptions").upsert({
        user_id: userId,
        stripe_customer_id: subscription.customer as string,
        stripe_subscription_id: subscription.id,
        status: isActive ? subscription.status as string : "canceled",
        plan,
        current_period_end: periodEnd,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.supabase_user_id;
      if (!userId) break;

      await supabase.from("subscriptions")
        .update({ status: "canceled", updated_at: new Date().toISOString() })
        .eq("user_id", userId);
      break;
    }

    default:
      // Unhandled event type
      break;
  }
}