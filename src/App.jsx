import { useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";
import TopBar from "./components/TopBar";
import Snapshot from "./components/Snapshot";
import Comparison from "./components/Comparison";
import Simulator from "./components/Simulator";
import Charts from "./components/Charts";
import CTA from "./components/CTA";

function useHorizontalScroll() {
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  return containerRef;
}

export default function App() {
  const scrollRef = useHorizontalScroll();
  const [role, setRole] = useState("Driver");

  const sections = [
    (goNext) => <Hero onStart={goNext} />,
    () => <Snapshot />,
    () => <Comparison />,
    () => <Simulator />,
    () => <Charts />,
    () => <CTA />,
  ];

  const scrollToIndex = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[idx];
    if (child) el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e) => {
      const el = scrollRef.current;
      if (!el) return;
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      if (e.key === "ArrowRight") scrollToIndex(Math.min(sections.length - 1, idx + 1));
      if (e.key === "ArrowLeft") scrollToIndex(Math.max(0, idx - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#F7FBFD]">
      <TopBar role={role} onRoleChange={setRole} />
      <div ref={scrollRef} className="w-full h-full overflow-x-auto overflow-y-hidden whitespace-nowrap snap-x snap-mandatory">
        {sections.map((Section, i) => (
          <div key={i} className="inline-block align-top w-screen h-screen snap-center">
            <Section goNext={() => scrollToIndex(Math.min(sections.length - 1, i + 1))} />
          </div>
        ))}
      </div>
    </div>
  );
}
