import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .select("id, title, url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    // In production this should also be logged to an observability tool.
    console.error("Failed to load bookmarks", error.message);
  }

  return <DashboardClient user={user} initialBookmarks={data || []} />;
}
