"use client";

export function DeleteConfirmDialog({ open, bookmarkTitle, onCancel, onConfirm, isDeleting }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 px-4">
      <div className="glass w-full max-w-md rounded-3xl p-6">
        <h2 className="text-lg font-semibold">Delete bookmark?</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          This will permanently remove <span className="font-semibold">{bookmarkTitle}</span>.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300/70 px-4 py-2 text-sm font-medium transition hover:bg-slate-200/70 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
