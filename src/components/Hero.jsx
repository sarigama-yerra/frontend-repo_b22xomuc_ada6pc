import { motion } from "framer-motion";

export default function Hero({ onStart }) {
  return (
    <section className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-[#0F5066] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[140%] h-[140%] -left-[20%] -top-[20%] absolute rounded-full bg-white/5 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#F7FBFD]">
          Ride-Hailing in Pakistan — inDrive & Yango
        </h1>
        <p className="mt-4 text-[#F7FBFD]/80 text-lg">
          Opportunities, Risks & Policy Asks
        </p>
        <p className="mt-2 text-sm text-[#F7FBFD]/70">Ahood / Anood Khan · {new Date().getFullYear()}</p>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(255,182,77,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="mt-10 px-6 py-3 rounded-full bg-[#FFB64D] text-[#0B1320] font-medium"
        >
          Start the journey
        </motion.button>

        <p className="mt-4 text-xs text-[#F7FBFD]/70">Explore: inDrive vs Yango • Drivers • Riders • Policy</p>
      </motion.div>
    </section>
  );
}
