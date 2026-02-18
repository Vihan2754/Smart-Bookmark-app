"use client";

import { useState } from "react";

export function AddBookmarkModal({ open, onClose, onSubmit, isSaving }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  if (!open) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({ title, url });
    setTitle("");
    setUrl("");
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 px-4">
      <div className="glass w-full max-w-lg rounded-3xl p-6">
        <h2 className="text-xl font-semibold">Add bookmark</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Save a title and URL to your private collection.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Title</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: React docs"
              className="w-full rounded-xl border border-slate-300/70 bg-white/80 px-3 py-2.5 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900/70"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">URL</span>
            <input
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-300/70 bg-white/80 px-3 py-2.5 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900/70"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300/70 px-4 py-2 text-sm font-medium transition hover:bg-slate-200/70 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save bookmark"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
