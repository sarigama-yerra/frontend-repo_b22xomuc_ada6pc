import { useState } from "react";

export default function TopBar({ role, onRoleChange }) {
  const [open, setOpen] = useState(false);
  const roles = ["Driver", "Rider", "Policy Maker"];
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white text-sm hover:bg-white/15"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        Explore as: <span className="font-medium">{role}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="mt-2 w-48 bg-[#0B1320] text-white rounded-lg border border-white/10 shadow-xl"
        >
          {roles.map((r) => (
            <li key={r}>
              <button
                role="option"
                aria-selected={role === r}
                onClick={() => {
                  onRoleChange(r);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-white/10 ${
                  role === r ? "bg-white/10" : ""
                }`}
              >
                {r}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
