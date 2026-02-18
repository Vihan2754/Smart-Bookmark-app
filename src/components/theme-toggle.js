"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-xl border border-slate-300/70 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 transition hover:scale-[1.02] hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900"
    >
      {resolvedTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
