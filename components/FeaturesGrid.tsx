const features = [
  {
    title: "Collect Feedback",
    desc: "Simple and intuitive feedback submission for all users.",
  },
  {
    title: "Anonymous Mode",
    desc: "Allow users to share honest feedback anonymously.",
  },
  {
    title: "Insights & Ratings",
    desc: "Track average ratings and understand user sentiment.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 -mt-16">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 text-center"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {f.title}
            </h3>
            <p className="text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}