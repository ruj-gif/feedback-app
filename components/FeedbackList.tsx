"use client";

import { useState } from "react";
import { Feedback } from "@/types/feedback";
import RatingStars from "./RatingStars";

type Props = {
  feedbacks: Feedback[];
  onUpdated?: () => void;
};

export default function FeedbackList({ feedbacks, onUpdated }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [saving, setSaving] = useState(false);

  function startEdit(fb: Feedback) {
    setEditingId(fb.id);
    setEditMessage(fb.message);
    setEditRating(fb.rating);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit() {
    if (!editingId) return;
    const message = editMessage.trim();
    if (!message) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/feedback/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, rating: editRating }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Update failed");
      }
      setEditingId(null);
      onUpdated?.();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {feedbacks.map((fb) => (
        <div
          key={fb.id}
          className="bg-white rounded-xl p-4 shadow border border-slate-100"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-slate-800">
              {fb.displayName ?? (fb.anonymous ? "Anonymous" : fb.name)}
            </p>
            {editingId !== fb.id ? (
              <span className="text-amber-400">
                {"★".repeat(fb.rating)}
              </span>
            ) : null}
          </div>

          {editingId === fb.id ? (
            <>
              <textarea
                className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
                placeholder="Message"
                rows={3}
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
              />
              <div className="mb-3">
                <span className="text-sm text-slate-600 mr-2">Rating:</span>
                <RatingStars rating={editRating} onChange={setEditRating} />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={saving || !editMessage.trim()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-sm hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-slate-600">{fb.message}</p>
              <button
                type="button"
                onClick={() => startEdit(fb)}
                className="mt-3 text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
