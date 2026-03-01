"use client";

export default function RatingStars({
  rating,
  onChange,
}: {
  rating: number;
  onChange?: (v: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={`text-2xl transition hover:scale-110 ${
            star <= rating ? "text-amber-400" : "text-slate-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
