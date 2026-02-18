export default function DashboardLoading() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-6">
      <div className="glass mb-8 h-20 animate-pulse rounded-2xl" />

      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-44 animate-pulse rounded bg-slate-300/70 dark:bg-slate-700/60" />
        <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-300/70 dark:bg-slate-700/60" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="glass h-40 animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
