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
        <div className="row" style={{ marginBottom: 4 }}>
          <div className="col-xs-5">
            <strong>{data.name}</strong>
          </div>

          <div className="col-xs-7">
            {data.localTime.format("YYYY-MM-DD HH:mm:ss")}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>（{RelationTextMap[data.dayRelation]}）</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>周{weekMap[data.localTime.day()]}</span>
          </div>
        </div>

        <TimeBar
            position={data.positionRatio}
            minutesOfDay={data.minutesOfDay}
        />
      </div>
  );
};

export default CityRow;
