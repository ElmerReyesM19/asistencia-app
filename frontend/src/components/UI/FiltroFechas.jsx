import React from "react";

export default function FiltroFechas({ desde, hasta, onChange }) {
  return (
    <div className="flex gap-4">
      <input type="date" value={desde} onChange={(e) => onChange("desde", e.target.value)} />
      <input type="date" value={hasta} onChange={(e) => onChange("hasta", e.target.value)} />
    </div>
  );
}
