import React from "react";
import { type CityTimeInfo, DayRelation } from "../utils/time";
import { TimeBar } from "./TimeBar";

const RelationTextMap = {
  [DayRelation.PREV]: "前一日",
  [DayRelation.SAME]: "当日",
  [DayRelation.NEXT]: "次日",
};

interface Props {
  data: CityTimeInfo;
}

const weekMap = ["日", "一", "二", "三", "四", "五", "六"];

export const CityRow: React.FC<Props> = ({ data }) => {
  return (
      <div style={{ marginBottom: 30 }}>
        <div className="row" style={{ marginBottom: 4, paddingLeft: 15 }}>
            <strong style={{ paddingRight: 24 }}>{data.name}</strong>
            <span style={{ paddingRight: 12 }}>{data.localTime.format('UTCZ')}</span>
            <span style={{ paddingRight: 12 }}>{data.localTime.format("YYYY-MM-DD HH:mm:ss")}</span>
            <span style={{ paddingRight: 12 }}>（{RelationTextMap[data.dayRelation]}）</span>
            <span>周{weekMap[data.localTime.day()]}</span>
        </div>

        <TimeBar
            position={data.positionRatio}
            minutesOfDay={data.minutesOfDay}
        />
      </div>
  );
};

export default CityRow;
