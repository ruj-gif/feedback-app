"use client";

import { useState } from "react";
import RatingStars from "./RatingStars";

export default function FeedbackForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message || rating === 0) return;

    setLoading(true);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: anonymous ? "Anonymous" : name,
        message,
        rating,
        anonymous,
      }),
    });

    setName("");
    setMessage("");
    setRating(0);
    setAnonymous(false);
    setLoading(false);
    onSubmitted();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"
    >
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Share your feedback
      </h3>

      {!anonymous && (
        <input
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <textarea
        className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        placeholder="Write your feedback..."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <RatingStars rating={rating} onChange={setRating} />

      <label className="flex items-center gap-2 text-sm text-slate-600 mt-3">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
        Submit anonymously
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:opacity-90 transition"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
