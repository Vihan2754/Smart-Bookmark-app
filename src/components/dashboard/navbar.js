"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar({ user }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message || "Logout failed.");
      return;
    }

    router.push("/login");
    router.refresh();
  }

  const avatar =
    user?.user_metadata?.avatar_url ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user?.email || "U")}`;

  return (
    <nav className="glass sticky top-4 z-20 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-4 py-3">
      <div>
        <h1 className="text-lg font-bold tracking-tight">Smart Bookmark Manager</h1>
        <p className="text-xs text-slate-600 dark:text-slate-300">{user?.email}</p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Image
          src={avatar}
          alt="User avatar"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full border border-white/70"
          unoptimized
        />
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
