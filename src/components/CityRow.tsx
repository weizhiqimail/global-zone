import React from "react";
import { type CityTimeInfo } from "../utils/time";
import { TimeBar } from "./TimeBar";

const relationText = {
  prev: "前一日",
  same: "当日",
  next: "次日",
};

interface Props {
  data: CityTimeInfo;
}

const weekMap = ["日", "一", "二", "三", "四", "五", "六"];

export const CityRow: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ marginBottom: 50 }}>
      <div className="row" style={{ marginBottom: 4 }}>
        <div className="col-xs-5">
          <strong>{data.name}</strong>
        </div>

        <div className="col-xs-7">
          {data.localTime.format("YYYY-MM-DD HH:mm:ss")}
          {"  "}
          <span>（{relationText[data.dayRelation]}&nbsp;&nbsp;&nbsp;&nbsp;周{weekMap[data.localTime.day()]}）</span>
        </div>
      </div>

      <TimeBar
        position={data.positionRatio}
        currentHour={data.localTime.hours()}
      />
    </div>
  );
};
