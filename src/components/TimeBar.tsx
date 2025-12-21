import React from "react";
import { TIME_CELL_COLORS } from "../config/theme";

interface Props {
    position: number; // 0-1
    minutesOfDay: number; // 0-1439
}

export const TimeBar: React.FC<Props> = ({ minutesOfDay }) => {
    // total units
    const TOTAL = 24 * 60;
    const pastUnits = Math.max(0, Math.min(TOTAL, minutesOfDay)); // minutes passed
    const currentUnits = 1; // occupies one unit
    const futureUnits = Math.max(0, TOTAL - pastUnits - currentUnits);

    const pastPercent = (pastUnits / TOTAL) * 100;
    const currentPercent = (currentUnits / TOTAL) * 100;
    const futurePercent = (futureUnits / TOTAL) * 100;

    // hour grid columns for overlay (24 columns)
    const hours = Array.from({ length: 24 }).map((_, i) => i);

    return (
        <div style={{ position: "relative", height: 56 }}>
            {/* minute-based background: three segments */}
            <div style={{ display: "flex", height: 36, width: "100%", position: "relative" }}>
                <div style={{ width: `${pastPercent}%`, background: TIME_CELL_COLORS.past }} />
                <div style={{ width: `${currentPercent}%`, background: "red" }} />
                <div style={{ width: `${futurePercent}%`, background: TIME_CELL_COLORS.future }} />
            </div>

            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 36, display: "flex", pointerEvents: "none" }}>
                {hours.map((h) => (
                    <div key={h} style={{ flex: 1, borderRight: h < 23 ? `1px solid ${TIME_CELL_COLORS.border}` : "none" }} />
                ))}
            </div>

            <div style={{ display: "flex", height: 20, marginTop: 4, fontSize: 12 }}>
                {hours.map((h) => (
                    <div key={h} style={{ flex: 1, textAlign: "center" }}>
                        {h}
                    </div>
                ))}
            </div>
        </div>
    );
};
