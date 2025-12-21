import moment from "moment-timezone";
import { CITY_LIST, type CityConfig } from "../config/cities";

export enum DayRelation {
  PREV = "PREV",
  SAME = "SAME",
  NEXT = "NEXT",
}

export interface CityTimeInfo {
  cityId: string;
  name: string;
  timezone: string;
  localTime: moment.Moment;
  dayRelation: DayRelation;
  positionRatio: number; // 0-1 based on minutes of day / 1440
  minutesOfDay: number; // 0 - 1439
}

export function getDayRelation(
    baseCityTime: moment.Moment,
    targetCityTime: moment.Moment
): DayRelation {
  const baseDate = baseCityTime.format("YYYY-MM-DD");
  const targetDate = targetCityTime.format("YYYY-MM-DD");

  if (targetDate === baseDate) return DayRelation.SAME;
  if (moment(targetDate).isBefore(baseDate, "day")) return DayRelation.PREV;
  return DayRelation.NEXT;
}

export function calculatePositionRatioByMinutes(time: moment.Moment): { positionRatio: number; minutesOfDay: number } {
  const minutes = time.hours() * 60 + time.minutes();
  return { positionRatio: minutes / (24 * 60), minutesOfDay: minutes };
}

export function computeCityTimes(
    cityConfigs: CityConfig[] = CITY_LIST,
    baseCityId: string = CITY_LIST[0].id
): CityTimeInfo[] {
  let baseCity = cityConfigs.find((c) => c.id === baseCityId);
  if (!baseCity) {
    baseCity = cityConfigs[0] || CITY_LIST[0];
  }

  const baseNow = moment().tz(baseCity.timezone);

  return cityConfigs.map((city) => {
    const localTime = moment().tz(city.timezone);
    const dayRelation = getDayRelation(baseNow, localTime);
    const { positionRatio, minutesOfDay } = calculatePositionRatioByMinutes(localTime);

    return {
      cityId: city.id,
      name: city.name,
      timezone: city.timezone,
      localTime,
      dayRelation,
      positionRatio,
      minutesOfDay,
    };
  });
}
