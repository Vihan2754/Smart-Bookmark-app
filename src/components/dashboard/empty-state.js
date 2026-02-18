export function EmptyState() {
  return (
    <div className="glass rounded-3xl border-dashed p-10 text-center">
      <h3 className="text-xl font-semibold">No bookmarks yet</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Click &quot;Add bookmark&quot; to save your first link.
      </p>
    </div>
  );
}
