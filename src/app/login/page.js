"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleLogin() {
    setIsLoading(true);

    const supabase = createClient();
    const origin = window.location.origin;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message || "Failed to start Google sign in.");
      setIsLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <section className="glass w-full max-w-md rounded-3xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Smart Bookmark</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Save and manage private bookmarks with realtime sync.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:scale-[1.01] hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {isLoading ? "Redirecting..." : "Continue with Google"}
        </button>
      </section>
    </main>
  );
}
