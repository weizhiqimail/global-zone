import moment from "moment-timezone";

import { CITY_LIST } from "../config/cities";

export interface CityTimeInfo {
  cityId: string;
  name: string;
  timezone: string;
  localTime: moment.Moment;
  dayRelation: "prev" | "same" | "next";
  positionRatio: number;
}

export function getDayRelation(
  base: moment.Moment,
  target: moment.Moment
): "prev" | "same" | "next" {
  const baseDate = base.format("YYYY-MM-DD");
  const targetDate = target.format("YYYY-MM-DD");

  if (targetDate === baseDate) return "same";
  if (target.isBefore(base, "day")) return "prev";
  return "next";
}

export function calculatePositionRatio(time: moment.Moment): number {
  const total = time.hours() * 60 * 60 + time.minutes() * 60 + time.seconds();
  return total / (24 * 60 * 60);
}

export function computeCityTimes(
  cityConfigs: { id: string; name: string; timezone: string }[],
  baseCityId: string
): CityTimeInfo[] {
  let baseCity = cityConfigs.find((c) => c.id === baseCityId);
  if (!baseCity) {
    baseCity = CITY_LIST[0];
  }

  const baseNow = moment().tz(baseCity.timezone);

  return cityConfigs.map((city) => {
    const localTime = moment().tz(city.timezone);

    return {
      cityId: city.id,
      name: city.name,
      timezone: city.timezone,
      localTime,
      dayRelation: getDayRelation(baseNow, localTime),
      positionRatio: calculatePositionRatio(localTime),
    };
  });
}
