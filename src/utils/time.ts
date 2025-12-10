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
  positionRatio: number;
}


export function calculatePositionRatio(time: moment.Moment): number {
  const total = time.hours() * 60 * 60 + time.minutes() * 60 + time.seconds();
  return total / (24 * 60 * 60);
}

export function computeCityTimes(
  cityConfigs: CityConfig[],
  baseCityId: string
): CityTimeInfo[] {
  let baseCity = cityConfigs.find((c) => c.id === baseCityId);
  if (!baseCity) {
    baseCity = CITY_LIST[0];
  }

  return cityConfigs.map((compareCity) => {
    const localTime = moment().tz(compareCity.timezone);
    return {
      cityId: compareCity.id,
      name: compareCity.name,
      timezone: compareCity.timezone,
      localTime,
      dayRelation: getDayRelation(baseCity, compareCity),
      positionRatio: calculatePositionRatio(localTime),
    };
  });


  function getDayRelation(
    baseCity: CityConfig,
    targetCity: CityConfig
  ): DayRelation {

    const baseCityTime = moment().tz(baseCity.timezone)
    const targetCityTime = moment().tz(targetCity.timezone)

    const baseDate = baseCityTime.format("YYYY-MM-DD");
    const targetDate = targetCityTime.format("YYYY-MM-DD");

    if (targetDate === baseDate) {
      return DayRelation.SAME;
    }
    if (moment(targetDate).isBefore(baseDate, "day")) {
      return DayRelation.PREV;
    }
    console.log(targetCity.name, 'not isBefore', baseCity.name);
    return DayRelation.NEXT;
  }

}
