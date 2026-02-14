import React, { useEffect, useState } from "react";
import { CITY_LIST } from "./config/cities";
import { CityTagSelector } from "./components/CityTagSelector";
import { computeCityTimes } from "./utils/time";
import { CityRow } from "./components/CityRow";
import HourMappingTable from "./components/HourMappingTable.tsx";

const BASE_CITY_ID = CITY_LIST[0].id;

const App: React.FC = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "Tokyo",
    "NewYork",
    "London",
]);

  const [, setTick] = useState(0);

  // 秒刷新
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((x) => x + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCities = CITY_LIST.filter((c) =>
    selectedCities.includes(c.id)
  );

  const cityTimes = computeCityTimes(filteredCities, BASE_CITY_ID);
  
  return (
    <div className="container" style={{ paddingTop: 30 }}>
      <h3 style={{ textAlign: 'center', paddingBottom: 30 }}>全球城市时区对应</h3>

      <CityTagSelector
        cities={CITY_LIST}
        selected={selectedCities}
        onChange={setSelectedCities}
      />

      {cityTimes.map((ct) => (
        <CityRow key={ct.cityId} data={ct} />
      ))}

      <HourMappingTable selectedCityIds={selectedCities} />
    </div>
  );
};

export default App;
