export interface CityConfig {
    id: string;
    name: string;
    timezone: string;
    desc?: string;
}

export const CITY_LIST: CityConfig[] = [
    // --- 亚太地区 (最先迎接新的一天) ---
    { id: "Sydney", name: "悉尼", timezone: "Australia/Sydney", desc: "澳大利亚东部时间 (最早)" },
    { id: "Tokyo", name: "东京", timezone: "Asia/Tokyo", desc: "日本标准时间" },
    { id: "Beijing", name: "北京", timezone: "Asia/Shanghai", desc: "中国标准时间" },

    // --- 欧洲地区 ---
    { id: "Paris", name: "巴黎", timezone: "Europe/Paris", desc: "中欧标准时间" },
    { id: "London", name: "伦敦", timezone: "Europe/London", desc: "格林威治标准时间" },

    // --- 北美地区 (美东/加东) ---
    { id: "Toronto", name: "多伦多", timezone: "America/Toronto", desc: "加拿大东部时区" },
    { id: "NewYork", name: "纽约", timezone: "America/New_York", desc: "美国东部时间 (美东)" },

    // --- 北美地区 (美中/墨中) ---
    { id: "Chicago", name: "芝加哥", timezone: "America/Chicago", desc: "美国中部时间 (美中)" },
    { id: "MexicoCity", name: "墨西哥城", timezone: "America/Mexico_City", desc: "墨西哥时间 (无夏令时)" },

    // --- 北美地区 (美西/加西，最后迎接新的一天) ---
    { id: "Vancouver", name: "温哥华", timezone: "America/Vancouver", desc: "加拿大太平洋时区" },
    { id: "LosAngeles", name: "洛杉矶", timezone: "America/Los_Angeles", desc: "美国西部时间 (美西)" }
];