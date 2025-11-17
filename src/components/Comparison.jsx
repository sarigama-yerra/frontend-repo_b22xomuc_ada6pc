import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

export default function Comparison() {
  const [scenario, setScenario] = useState("short");
  const [proposed, setProposed] = useState(300);
  const [res, setRes] = useState(null);

  useEffect(() => {
    apiGet(`/api/platform-comparison?scenario=${scenario}&proposed_fare=${proposed}`)
      .then(setRes)
      .catch(console.error);
  }, [scenario, proposed]);

  return (
    <section className="w-full min-h-screen bg-[#0F5066] text-white flex items-center justify-center py-16 px-6">
      <div className="max-w-5xl w-full grid gap-6">
        <div className="flex items-center gap-4">
          <label className="text-sm">Scenario</label>
          <select
            className="bg-white/10 border border-white/20 rounded px-3 py-2"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          >
            <option value="short">Short Trip</option>
            <option value="peak">Peak Hour</option>
            <option value="long">Long Trip</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
            <h3 className="font-semibold">inDrive (negotiation)</h3>
            <input
              type="range"
              min={50}
              max={3000}
              value={proposed}
              onChange={(e) => setProposed(parseInt(e.target.value))}
              className="w-full mt-4"
              aria-label="Proposed fare"
            />
            <p className="mt-2 text-sm">Proposed fare: <span className="font-semibold">Rs {proposed}</span></p>
            {res && (
              <p className="mt-2 text-sm">Acceptance chance: <span className="font-semibold">{Math.round(res.acceptance_prob * 100)}%</span></p>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
            <h3 className="font-semibold">Yango (fixed fare)</h3>
            {res && (
              <>
                <p className="mt-2 text-sm">Estimated fare: <span className="font-semibold">Rs {res.yango_fare}</span></p>
                <p className="mt-1 text-xs text-white/80">Includes base per-km, distance, and surge for scenario.</p>
              </>
            )}
          </div>
        </div>

        {res && (
          <div className="p-5 rounded-2xl bg-[#FFB64D] text-[#0B1320]">
            <p className="text-sm">Who benefits in this setup? <span className="font-semibold capitalize">{res.beneficiary}</span></p>
          </div>
        )}
      </div>
    </section>
  );
}
