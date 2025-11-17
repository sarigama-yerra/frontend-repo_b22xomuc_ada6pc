export default function CTA() {
  const roles = {
    Advocate: [
      "Map local driver groups and safety NGOs.",
      "Push for platform transparency on ratings and deactivations.",
      "Pilot a night-safety hotline with partners.",
    ],
    Researcher: [
      "Publish an open micro-dataset on hours and costs.",
      "Run a field experiment on surge pricing fairness.",
      "Co-design interviews with women riders and drivers.",
    ],
    "Policy maker": [
      "Draft disclosures for fare and rating algorithms.",
      "Enable social protection contributions for gig workers.",
      "Set a grievance redress SLA for platforms.",
    ],
    Platform: [
      "Test transparent fare breakdown UI.",
      "Invest in opt-in women-only ride options and support.",
      "Publish quarterly safety and earnings dashboards.",
    ],
  };

  return (
    <section className="w-full min-h-screen bg-[#0F5066] text-white flex items-center justify-center py-16 px-6">
      <div className="max-w-4xl w-full">
        <h3 className="text-2xl font-semibold">Call to Action — Choose a Role</h3>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {Object.entries(roles).map(([role, steps]) => (
            <div key={role} className="p-5 rounded-2xl bg-white/10 border border-white/20">
              <h4 className="font-semibold">{role}</h4>
              <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-white/90">
                {steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
