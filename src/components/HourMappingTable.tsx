import React from "react";
import moment from "moment-timezone";
import {CITY_LIST} from "../config/cities";

interface Props {
    selectedCityIds: string[];
}

export const HourMappingTable: React.FC<Props> = ({selectedCityIds}) => {
    if (selectedCityIds.length === 0) {
        return null;
    }

    const cities = selectedCityIds
        .map((id) => CITY_LIST.find((c) => c.id === id))
        .filter(Boolean);

    if (cities.length === 0) {
        return null;
    }

    const baseCity = cities[0];
    const baseNow = moment().tz(baseCity!.timezone);

    const hours = Array.from({length: 24}).map((_, i) => i);

    console.log('selectedCityIds', selectedCityIds)

    return (
        <div style={{marginTop: 50}}>
            <h4 className={"text-center"}>整点时间对应表（基准：{baseCity!.name}）</h4>

            <table className="table table-hover table-bordered table-condensed">
                <thead>
                <tr>
                    {cities.map((city) => (
                        <th key={city!.id}>{city!.name}</th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {hours.map((h) => {
                    const baseHourTime = baseNow.clone().hour(h).minute(0).second(0);

                    return (
                        <tr key={h}>

                            {cities.map((city) => {
                                const local = baseHourTime.clone().tz(city!.timezone);
                                return (
                                    <td key={city!.id}>
                                        {local.format("YYYY-MM-DD HH:mm")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default HourMappingTable;
