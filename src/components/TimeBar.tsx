import React from "react";
import { TIME_CELL_COLORS } from "../config/theme";

interface Props {
    position: number;
    currentHour: number; // 0-23
}

export const TimeBar: React.FC<Props> = ({ position, currentHour }) => {
    return (
        <div style={{ position: "relative", height: 40 }}>
            <div style={{ display: "flex", height: "100%" }}>
                {Array.from({ length: 24 }).map((_, hour) => {
                    const isPast = hour < currentHour;

                    return (
                        <div
                            key={hour}
                            style={{
                                flex: 1
                            }}
                        >

                            <div
                                style={{
                                    borderRight: hour < 23 ? `1px solid ${TIME_CELL_COLORS.border}` : undefined,
                                    background: isPast
                                        ? TIME_CELL_COLORS.past
                                        : TIME_CELL_COLORS.future,
                                    color: "#000",
                                    width: '100%',
                                    height: '100%',
                                    fontSize: 10,
                                    textAlign: "center",
                                    lineHeight: "30px",
                                    position: "relative",

                                }}>

                            </div>
                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: 16
                                }}
                            > {hour}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 红线 */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: `${position * 100}%`,
                    width: 2,
                    height: "100%",
                    background: "red",
                }}
            />
        </div>
    );
};
