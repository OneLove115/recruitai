"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createCandidate(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  if (!name?.trim() || !email?.trim()) return { error: "Name and email are required" };

  const job_id = (formData.get("job_id") as string) || null;

  const { error } = await supabase.from("candidates").insert({
    owner_id: user.id,
    name: name.trim(),
    email: email.trim(),
    phone: (formData.get("phone") as string) || null,
    linkedin_url: (formData.get("linkedin_url") as string) || null,
    cv_text: (formData.get("cv_text") as string) || null,
    job_id: job_id || null,
    stage: "new",
  });

  if (error) return { error: error.message };
  redirect("/dashboard/candidates");
}

export async function updateCandidateStage(id: string, stage: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("candidates")
    .update({ stage })
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteCandidate(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("candidates").delete().eq("id", id).eq("owner_id", user.id);
  redirect("/dashboard/candidates");
}
