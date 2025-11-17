import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../utils/api";

export default function Charts() {
  const [city, setCity] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (vehicle) params.set("vehicle", vehicle);
    apiGet(`/api/chart-data${params.toString() ? `?${params.toString()}` : ""}`)
      .then(setRows)
      .catch(console.error);
  }, [city, vehicle]);

  const cities = useMemo(() => Array.from(new Set(rows.map((r) => r.city))), [rows]);

  return (
    <section className="w-full min-h-screen bg-[#0F5066] text-white flex items-center justify-center py-16 px-6">
      <div className="max-w-6xl w-full">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <label className="text-sm">City
            <select className="ml-2 bg-white/10 border border-white/20 rounded px-3 py-2" value={city} onChange={(e)=>setCity(e.target.value)}>
              <option value="">All</option>
              <option>Islamabad</option>
              <option>Lahore</option>
              <option>Karachi</option>
            </select>
          </label>
          <label className="text-sm">Vehicle
            <select className="ml-2 bg-white/10 border border-white/20 rounded px-3 py-2" value={vehicle} onChange={(e)=>setVehicle(e.target.value)}>
              <option value="">All</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
            <h4 className="font-semibold">Hours worked vs legal limit</h4>
            <div className="mt-3 space-y-2">
              {rows.map((r, i) => (
                <div key={i} className="text-sm flex items-center gap-3">
                  <div className="w-24 shrink-0">{r.city} ({r.vehicle})</div>
                  <div className="h-3 bg-black/30 rounded w-full relative">
                    <div className="absolute inset-y-0 left-0 bg-[#FFB64D] rounded" style={{ width: `${Math.min(100, (r.avg_weekly_hours / 84) * 100)}%` }} />
                  </div>
                  <div className="w-10 text-right">{r.avg_weekly_hours}h</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
            <h4 className="font-semibold">Income before/after costs</h4>
            <div className="mt-3 space-y-2">
              {rows.map((r, i) => (
                <div key={i} className="text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-24 shrink-0">{r.city} ({r.vehicle})</div>
                    <div className="flex-1 h-3 bg-black/30 rounded relative">
                      <div className="absolute inset-y-0 left-0 bg-teal-300/80 rounded" style={{ width: `${Math.min(100, (r.avg_takehome_before_costs / 40000) * 100)}%` }} />
                      <div className="absolute inset-y-0 left-0 bg-[#FF6B6B]/80 rounded" style={{ width: `${Math.min(100, (r.avg_takehome_after_costs / 40000) * 100)}%` }} />
                    </div>
                    <div className="w-28 text-right">Rs {r.avg_takehome_after_costs}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
            <h4 className="font-semibold">Gender distribution</h4>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              {rows.map((r, i) => (
                <div key={i} className="p-3 rounded bg-black/20 text-center">
                  <div className="text-xs">{r.city} ({r.vehicle})</div>
                  <div className="mt-2 text-2xl font-semibold">{r.pct_female_drivers}%</div>
                  <div className="text-xs text-white/70">female drivers</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
            <h4 className="font-semibold">% uninsured</h4>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              {rows.map((r, i) => (
                <div key={i} className="p-3 rounded bg-black/20 text-center">
                  <div className="text-xs">{r.city} ({r.vehicle})</div>
                  <div className="mt-2 text-2xl font-semibold">{r.pct_uninsured}%</div>
                  <div className="text-xs text-white/70">uninsured</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
