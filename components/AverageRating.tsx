"use client";

type Props = { value?: number | null };

export default function AverageRating({ value = null }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
      <p className="text-sm text-slate-500">Average Rating</p>
      <p className="text-4xl font-bold text-emerald-600 mt-2">
        {value != null ? `⭐ ${Number(value).toFixed(1)}` : "—"}
      </p>
      <p className="text-sm text-slate-500 mt-1">Based on user feedback</p>
    </div>
  );
}
