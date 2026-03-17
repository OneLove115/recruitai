"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  if (!title?.trim()) return { error: "Job title is required" };

  const hiddenCriteriaText = (formData.get("hidden_criteria_text") as string) || "";
  const hidden_criteria = hiddenCriteriaText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const { error } = await supabase.from("jobs").insert({
    owner_id: user.id,
    title: title.trim(),
    location: (formData.get("location") as string) || null,
    remote: formData.get("remote") === "on",
    employment_type: (formData.get("employment_type") as string) || null,
    description: (formData.get("description") as string) || null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requirements: (formData.get("requirements") as string) || null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    salary_min: formData.get("salary_min") ? Number(formData.get("salary_min")) : null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    salary_max: formData.get("salary_max") ? Number(formData.get("salary_max")) : null as any,
    status: "active",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hidden_criteria: hidden_criteria as any,
  });

  if (error) return { error: error.message };
  redirect("/dashboard/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  if (!title?.trim()) return { error: "Job title is required" };

  const hiddenCriteriaText = (formData.get("hidden_criteria_text") as string) || "";
  const hidden_criteria = hiddenCriteriaText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const { error } = await supabase.from("jobs").update({
    title: title.trim(),
    location: (formData.get("location") as string) || null,
    remote: formData.get("remote") === "on",
    employment_type: (formData.get("employment_type") as string) || null,
    description: (formData.get("description") as string) || null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requirements: (formData.get("requirements") as string) || null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    salary_min: formData.get("salary_min") ? Number(formData.get("salary_min")) : null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    salary_max: formData.get("salary_max") ? Number(formData.get("salary_max")) : null as any,
    status: (formData.get("status") as string) || "active",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hidden_criteria: hidden_criteria as any,
  }).eq("id", id).eq("owner_id", user.id);

  if (error) return { error: error.message };
  redirect("/dashboard/jobs");
}

export async function deleteJob(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("jobs").delete().eq("id", id).eq("owner_id", user.id);
  redirect("/dashboard/jobs");
}
