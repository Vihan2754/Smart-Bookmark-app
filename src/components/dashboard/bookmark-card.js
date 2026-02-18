const createdAtFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

export function BookmarkCard({ bookmark, onDelete }) {
  const createdAtText = createdAtFormatter.format(new Date(bookmark.created_at));

  return (
    <article className="glass rounded-2xl p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{bookmark.title}</h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block truncate text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {bookmark.url}
          </a>
        </div>

        <button
          type="button"
          onClick={() => onDelete(bookmark)}
          className="rounded-lg px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          Delete
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        Added {createdAtText} UTC
      </p>
    </article>
  );
}
