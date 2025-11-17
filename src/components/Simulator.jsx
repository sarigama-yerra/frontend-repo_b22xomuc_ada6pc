import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Simulator() {
  const [inputs, setInputs] = useState({
    hours_online: 12,
    fuel_cost_per_liter: 290,
    km_driven: 140,
    base_fare_per_km: 38,
    algorithm_bonus: 0.0,
    algorithm_penalty: 0.0,
  });
  const [result, setResult] = useState(null);
  const update = (k, v) => setInputs((s) => ({ ...s, [k]: v }));

  return (
    <section className="w-full min-h-screen bg-[#0F5066] text-white flex items-center justify-center py-16 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
          <h3 className="font-semibold">Driver Life — Simulation</h3>
          <div className="mt-4 space-y-3 text-sm">
            <label className="block">Hours online: {inputs.hours_online}
              <input type="range" min="4" max="16" value={inputs.hours_online} onChange={(e)=>update('hours_online', parseInt(e.target.value))} className="w-full"/>
            </label>
            <label className="block">Fuel cost per liter: Rs {inputs.fuel_cost_per_liter}
              <input type="range" min="230" max="350" value={inputs.fuel_cost_per_liter} onChange={(e)=>update('fuel_cost_per_liter', parseInt(e.target.value))} className="w-full"/>
            </label>
            <label className="block">Km driven: {inputs.km_driven}
              <input type="range" min="40" max="220" value={inputs.km_driven} onChange={(e)=>update('km_driven', parseInt(e.target.value))} className="w-full"/>
            </label>
            <label className="block">Base fare per km: Rs {inputs.base_fare_per_km}
              <input type="range" min="25" max="60" value={inputs.base_fare_per_km} onChange={(e)=>update('base_fare_per_km', parseInt(e.target.value))} className="w-full"/>
            </label>
            <label className="block">Algorithm bonus: {Math.round(inputs.algorithm_bonus*100)}%
              <input type="range" min="0" max="0.25" step="0.01" value={inputs.algorithm_bonus} onChange={(e)=>update('algorithm_bonus', parseFloat(e.target.value))} className="w-full"/>
            </label>
            <label className="block">Algorithm penalty: {Math.round(inputs.algorithm_penalty*100)}%
              <input type="range" min="0" max="0.4" step="0.01" value={inputs.algorithm_penalty} onChange={(e)=>update('algorithm_penalty', parseFloat(e.target.value))} className="w-full"/>
            </label>
            <button onClick={async ()=> setResult(await apiPost('/api/simulate', inputs))} className="mt-2 px-3 py-2 rounded bg-[#FFB64D] text-[#0B1320]">Run day</button>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
          <h3 className="font-semibold">Outcome</h3>
          {result ? (
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded bg-black/20">Gross: Rs {result.gross_income}</div>
              <div className="p-3 rounded bg-black/20">Fuel: Rs {result.fuel_cost}</div>
              <div className="p-3 rounded bg-black/20">Maint.: Rs {result.maintenance}</div>
              <div className="p-3 rounded bg-black/20">Platform fee: Rs {result.platform_fee}</div>
              <div className="col-span-2 p-3 rounded bg-[#FFB64D] text-[#0B1320] font-medium">Net take-home: Rs {result.net_takehome}</div>
              <div className="col-span-2 p-3 rounded bg-white/10">Stress index: {result.stress_index}/100</div>
            </div>
          ) : (
            <p className="mt-4 text-white/80 text-sm">Adjust inputs and run the day to see outcomes.</p>
          )}
        </div>
      </div>
    </section>
  );
}
