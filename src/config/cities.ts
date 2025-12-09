export interface CityConfig {
    id: string;
    name: string;
    timezone: string;
}

export const CITY_LIST: CityConfig[] = [
    { id: "Tokyo", name: "东京", timezone: "Asia/Tokyo" },
    { id: "Beijing", name: "北京", timezone: "Asia/Shanghai" },
    { id: "Sydney", name: "悉尼", timezone: "Australia/Sydney" },
    { id: "LosAngeles", name: "洛杉矶", timezone: "America/Los_Angeles" },
    { id: "NewYork", name: "纽约", timezone: "America/New_York" },
    { id: "London", name: "伦敦", timezone: "Europe/London" },
    { id: "Paris", name: "巴黎", timezone: "Europe/Paris" }
];
