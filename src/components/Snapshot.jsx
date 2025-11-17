import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiGet } from "../utils/api";

function FlipCard({ title, children, cta }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((v) => !v)}
      className="relative w-full h-48 md:h-56 rounded-2xl [perspective:1000px] focus:outline-none focus:ring-2 focus:ring-amber-300"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-white/10 text-white p-5 border border-white/20">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-white/80">Tap to reveal</p>
        </div>
        <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl bg-white/10 text-white p-5 border border-white/20">
          {children}
          {cta && <p className="mt-3 text-amber-300 text-sm">{cta}</p>}
        </div>
      </motion.div>
    </button>
  );
}

export default function Snapshot() {
  const [data, setData] = useState(null);
  useEffect(() => {
    apiGet("/api/summary").then(setData).catch(console.error);
  }, []);
  return (
    <section className="w-full min-h-screen bg-[#0F5066] text-white flex items-center justify-center py-16 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {data && (
          <>
            <FlipCard title="Labor" cta="Show evidence">
              <p className="text-sm">{data.labor.headline}</p>
              <p className="text-xl font-semibold mt-1">{data.labor.stat}</p>
              <p className="mt-2 text-sm">{data.labor.quote}</p>
            </FlipCard>
            <FlipCard title="Safety" cta="Show evidence">
              <p className="text-sm">{data.safety.headline}</p>
              <p className="text-xl font-semibold mt-1">{data.safety.stat}</p>
              <p className="mt-2 text-sm">{data.safety.note}</p>
            </FlipCard>
            <FlipCard title="Algorithm" cta="Show evidence">
              <p className="text-sm">{data.algorithm.headline}</p>
              <p className="mt-2 text-sm">{data.algorithm.note}</p>
            </FlipCard>
            <FlipCard title="Policy" cta="Show evidence">
              <p className="text-sm">{data.policy.headline}</p>
              <p className="mt-2 text-sm">{data.policy.note}</p>
            </FlipCard>
          </>
        )}
      </div>
    </section>
  );
}
