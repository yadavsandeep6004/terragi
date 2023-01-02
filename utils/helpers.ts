import { protectedRoutes } from "./routes";
import { OptionType, SearchConfigType } from "./types";

const utcToIndiaOffset: number = 19800000;

export const monthOption = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const monthMap: any = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};

const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: "compact",
    // compactDisplay: "long",
});

export const getPath = () => window.location.pathname;

export const getQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams;
};

export const getQueryParamsByKey = (key: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get(key);
    return myParam;
};

export const getOrdinalSuffix = (i: string | number): string => {
    i = +i;
    const j = i % 10;
    const k = i % 100;
    if (j === 1 && k !== 11) {
        return `st`;
    }
    if (j === 2 && k !== 12) {
        return `nd`;
    }
    if (j === 3 && k !== 13) {
        return `rd`;
    }
    return `th`;
};

export const convertConfigDataToSemanticLanguage = (
    data: SearchConfigType[]
): OptionType[] =>
    data.map((query) => ({
        // eslint-disable-next-line no-underscore-dangle
        key: query._id,
        value: `${query.value}`,
        text: `${query.label}`,
    }));

export const formatMoneyToInr = (value: number | string) =>
    formatter.format(+value).substring(1);

export const isCurrentPathProtected = () => {
    const path = getPath().substring(1);
    const isCurrentRouteProtected = protectedRoutes.includes(path);
    return isCurrentRouteProtected;
};

export const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    let month: string | number = newDate.getMonth() + 1;
    let day: string | number = newDate.getDate();

    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }
    return `${year}-${monthOption[+month - 1]}-${day}`;
};

export const getReliableDateFormat = (dateStr: string) => {
    const dateSplit: string[] = dateStr.split("-");
    const day = +dateSplit[2];
    const monthStr: string = dateSplit[1];
    const month = +monthMap[monthStr];
    const year = +dateSplit[0];
    const simpleDate = new Date(year, month, day);
    simpleDate.setTime(simpleDate.getTime() + utcToIndiaOffset);
    return simpleDate.toISOString();
};

export const toLakhsCr = (val: number) => {
    if (val >= 10000000) {
        return `${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
        return `${(val / 100000).toFixed(2)} Lakhs`;
    }
    return val;
};

const DURATION_IN_SECONDS: { [key: string]: any } = {
    epochs: ["year", "month", "day", "hour", "minute"],
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
};

const getDuration = (seconds: any) => {
    let epoch: string;
    let interval: number;
    let i: number;

    for (i = 0; i < DURATION_IN_SECONDS.epochs.length; i += 1) {
        epoch = DURATION_IN_SECONDS.epochs[i];
        interval = Math.floor(seconds / (DURATION_IN_SECONDS[epoch] as any));
        if (interval >= 1) {
            return {
                interval,
                epoch,
            };
        }
    }

    return null;
};

export const postedAgo = (date: any) =>
    `${new Date(date).toLocaleDateString("in")}, ${new Date(
        date
    ).toLocaleTimeString("en")}`;

export const pageview = (url: string) => {
    if (window && (window as any).gtag) {
        (window as any).gtag("config", "G-LWJRK5L2YW", {
            page_path: url,
        });
    }
};

export const sendTagEvent = ({ action, params }: any) => {
    (window as any).gtag("event", action, params);
};
