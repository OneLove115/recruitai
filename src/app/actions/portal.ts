"use server";
import { createClient } from "@/lib/supabase/server";

export async function applyToJob(formData: FormData) {
  const jobId = formData.get("job_id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!jobId || !name?.trim() || !email?.trim()) {
    return { error: "Name and email are required" };
  }

  const supabase = await createClient();

  // Check job exists and is active
  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, status")
    .eq("id", jobId)
    .eq("status", "active")
    .single();

  if (!job) return { error: "This job is no longer accepting applications" };

  // Check for duplicate application
  const { data: existing } = await supabase
    .from("portal_applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("email", email.trim().toLowerCase())
    .single();

  if (existing) return { error: "You have already applied for this position" };

  const { error } = await supabase.from("portal_applications").insert({
    job_id: jobId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: (formData.get("phone") as string) || null,
    linkedin_url: (formData.get("linkedin_url") as string) || null,
    cv_text: (formData.get("cv_text") as string) || null,
    cover_letter: (formData.get("cover_letter") as string) || null,
    status: "applied",
  });

  if (error) return { error: error.message };
  return { success: true, jobTitle: job.title };
}

export async function getApplicationStatus(email: string) {
  const supabase = await createClient();

  const { data: applications } = await supabase
    .from("portal_applications")
    .select("id, status, created_at, jobs(title)")
    .eq("email", email.toLowerCase())
    .order("created_at", { ascending: false });

  return applications ?? [];
}
