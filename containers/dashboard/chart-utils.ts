import { ChartDataset, ChartOptions } from "chart.js";

import { UserStatsType } from "./types";

export const chartOptions: ChartOptions<"bar" | "doughnut"> = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                pointStyle: "circle",
                usePointStyle: true,
                font: { family: "Roboto", size: 14, lineHeight: 16 },
                padding: 30,
                boxWidth: 6,
            },
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                color: "rgba(232,232,232,0.6)",
            },
            ticks: {
                color: "#b9b9b9",
            },
        },
    },
    maintainAspectRatio: false,
};

export const barConfig: ChartDataset<"bar", number[]> = {
    data: [],
    borderRadius: 60,
    borderWidth: { left: 4, right: 4 },
    borderColor: "rgba(0,0,0,0)",
    barThickness: 20,
};

export const doughnutConfig: ChartOptions<"doughnut"> = {
    cutout: "60%",
};

export const colorYellow = "#FCE84E";
export const colorBlue = "#7D6BF0";

export const initialStats: UserStatsType = {
    propertyStats: {
        last30Days: {
            propertySearch: 0,
            bookmark: 0,
            shownToClients: 0,
        },
        last90Days: {
            propertySearch: 0,
            bookmark: 0,
            shownToClients: 0,
        },
    },
    contactBuilderStats: {
        last30Days: {
            numberView: 0,
            builderCall: 0,
        },
        last90Days: {
            numberView: 0,
            builderCall: 0,
        },
    },
    leadStats: [],
    communityStats: {
        propertyPosted: 0,
        propertySearch: 0,
    },
};
