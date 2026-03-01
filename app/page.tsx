"use client";

import { useEffect, useState } from "react";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import AverageRating from "@/components/AverageRating";
import { Feedback } from "@/types/feedback";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  async function loadFeedbacks() {
    try {
      const [listRes, avgRes] = await Promise.all([
        fetch("/api/feedback"),
        fetch("/api/feedback/average"),
      ]);
      const listData = await listRes.json();
      const avgData = await avgRes.json();
      if (listRes.ok && Array.isArray(listData)) {
        setFeedbacks(listData);
      } else {
        setFeedbacks([]);
      }
      if (avgRes.ok && typeof avgData.averageRating === "number") {
        setAverageRating(avgData.averageRating);
      } else {
        setAverageRating(null);
      }
    } catch {
      setFeedbacks([]);
      setAverageRating(null);
    }
  }

  useEffect(() => {
    void loadFeedbacks();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Feedback Board
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Collect honest feedback, understand users better, and build trust —
            all in one place.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-16 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <AverageRating value={averageRating} />
          </div>
          <div className="md:col-span-2">
            <FeedbackForm onSubmitted={loadFeedbacks} />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            What users are saying
          </h2>
          <FeedbackList feedbacks={feedbacks} onUpdated={loadFeedbacks} />
        </div>
      </section>
    </main>
  );
}
