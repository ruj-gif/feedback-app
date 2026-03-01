import { Feedback } from "@/types/feedback";

export default function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const displayName = feedback.displayName;
  return (
    <div className="rounded-2xl border border-teal-200/60 bg-teal-50/70 p-5 shadow-md shadow-teal-900/5 transition-shadow hover:shadow-lg hover:shadow-teal-900/10 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-medium text-slate-800">
          {displayName}
        </span>
        <span className="shrink-0 text-teal-600 text-sm font-medium tabular-nums">
          {"★".repeat(feedback.rating)}
        </span>
      </div>
      <p className="text-slate-600 leading-relaxed">{feedback.message}</p>
    </div>
  );
}
