"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { isValidHttpUrl } from "@/lib/validators";
import { Navbar } from "@/components/dashboard/navbar";
import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { AddBookmarkModal } from "@/components/dashboard/add-bookmark-modal";
import { DeleteConfirmDialog } from "@/components/dashboard/delete-confirm-dialog";
import { EmptyState } from "@/components/dashboard/empty-state";

export function DashboardClient({ user, initialBookmarks }) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    // Realtime keeps multiple tabs synced for the current user.
    const channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        async () => {
          const { data, error } = await supabase
            .from("bookmarks")
            .select("id, title, url, created_at")
            .order("created_at", { ascending: false });

          if (!error) {
            setBookmarks(data || []);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user.id]);

  async function handleAddBookmark({ title, url }) {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!isValidHttpUrl(url)) {
      toast.error("Enter a valid URL with http:// or https://");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase.from("bookmarks").insert({
      title: title.trim(),
      url: url.trim(),
    });

    setIsSaving(false);

    if (error) {
      toast.error(error.message || "Failed to save bookmark.");
      return;
    }

    setIsAddModalOpen(false);
    toast.success("Bookmark saved.");
  }

  async function handleDeleteConfirm() {
    if (!bookmarkToDelete) return;

    setIsDeleting(true);

    const { error } = await supabase.from("bookmarks").delete().eq("id", bookmarkToDelete.id);

    setIsDeleting(false);

    if (error) {
      toast.error(error.message || "Failed to delete bookmark.");
      return;
    }

    setBookmarkToDelete(null);
    toast.success("Bookmark deleted.");
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-6">
      <Navbar user={user} />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Bookmarks</h2>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-500"
        >
          Add Bookmark
        </button>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={setBookmarkToDelete} />
          ))}
        </div>
      )}

      <AddBookmarkModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddBookmark}
        isSaving={isSaving}
      />

      <DeleteConfirmDialog
        open={Boolean(bookmarkToDelete)}
        bookmarkTitle={bookmarkToDelete?.title}
        onCancel={() => setBookmarkToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
