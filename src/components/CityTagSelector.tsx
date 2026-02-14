import React, { useState } from "react";
import { type CityConfig } from "../config/cities";

interface Props {
  cities: CityConfig[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export const CityTagSelector: React.FC<Props> = ({
  cities = [],
  selected,
  onChange,
}) => {
  const [fading, setFading] = useState<string | null>(null);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setFading(id);
      setTimeout(() => {
        onChange(selected.filter((x) => x !== id));
        setFading(null);
      }, 200);
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="form-inline" style={{ marginBottom: 30, lineHeight: "30px" }}>
      <label style={{ marginRight: 10 }}>城市：</label>

      {cities.map((c) => {
        const active = selected.includes(c.id);
        const fadingOut = fading === c.id;

        return (
          <span
            key={c.id}
            className={`label ${
              active ? "label-primary" : "label-default"
            } fade-tag ${fadingOut ? "fade-tag-leave" : ""}`}
            style={{
              cursor: "pointer",
              marginRight: 6,
              padding: "6px 10px",
              fontSize: 14,
            }}
            onClick={() => toggle(c.id)}
          >
            {c.name}
          </span>
        );
      })}
    </div>
  );
};
