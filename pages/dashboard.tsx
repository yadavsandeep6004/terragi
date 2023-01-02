import React, { useEffect, useMemo, useState } from "react";

import { Bar, Doughnut } from "react-chartjs-2";

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js";

import cx from "classnames";

import { ProtectedPage } from "../components/protected-page";
import { withAuth } from "../hoc/withAuth";
import { ColorType, FontType, Text } from "../components/text";
import { ChartContainer } from "../components/chart";
import { Layout } from "../components/layout";
import { ToastVariant, useToast } from "../hooks/useToast";
import {
    barConfig,
    chartOptions,
    colorBlue,
    colorYellow,
    doughnutConfig,
    initialStats,
} from "../containers/dashboard/chart-utils";
import { getStats } from "../containers/dashboard/dashboard-service";
import { Loader } from "../components/loader";
import { BrokerPage } from "../hoc/BrokerPage";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { toast, ToasterElement } = useToast();
    const [stats, setStats] = useState(initialStats);
    const [isLoading, setIsLoading] = useState(true);

    const chartContainerClasses = "min-h-[340px]";

    const datasets = {
        properties: {
            labels: ["Search", "Bookmarks", "Shown to clients"],
            data: [
                {
                    ...barConfig,
                    label: " Last 30 days      ",
                    data: [
                        stats.propertyStats.last30Days.propertySearch,
                        stats.propertyStats.last30Days.bookmark,
                        stats.propertyStats.last30Days.shownToClients,
                    ],
                    backgroundColor: colorYellow,
                },
                {
                    ...barConfig,
                    label: " Last 90 Days",
                    data: [
                        stats.propertyStats.last90Days.propertySearch,
                        stats.propertyStats.last90Days.bookmark,
                        stats.propertyStats.last90Days.shownToClients,
                    ],
                    backgroundColor: colorBlue,
                },
            ],
        },
        builder: {
            labels: ["Number viewed", "Builders Called"],
            data: [
                {
                    ...barConfig,
                    label: " Last 30 days      ",
                    data: [
                        stats.contactBuilderStats.last30Days.numberView,
                        stats.contactBuilderStats.last30Days.builderCall,
                    ],
                    backgroundColor: colorYellow,
                },
                {
                    ...barConfig,
                    label: " Last 90 Days",
                    data: [
                        stats.contactBuilderStats.last90Days.numberView,
                        stats.contactBuilderStats.last90Days.builderCall,
                    ],
                    backgroundColor: colorBlue,
                },
            ],
        },
        leads: {
            labels: stats.leadStats.map((i) => i.label),
            data: [
                {
                    ...doughnutConfig,
                    backgroundColor: stats.leadStats.map((i) => i.color),
                    data: stats.leadStats.map((i) => i.count),
                },
            ],
        },
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await getStats();
            if (res.isSuccessful) {
                setStats(res.data);
            } else {
                toast({
                    message: "Unable to fetch dashboard data",
                    variant: ToastVariant.ERROR,
                });
            }
            setIsLoading(false);
        })();
    }, []);

    const totalLeads = useMemo(
        () => stats.leadStats.reduce((prev, curr) => prev + curr.count, 0),
        [stats]
    );

    return (
        <Layout>
            <Text
                font={FontType.HEADING_M}
                color={ColorType.COOL_BLACK}
                weight={500}
                className="pt-12 px-12 relative"
            >
                Dashboard
            </Text>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-10 gap-10 p-8 md:p-12">
                    {/* Properties Summary */}
                    <ChartContainer
                        className={cx("sm:col-span-4", chartContainerClasses)}
                        title="Properties Summary"
                    >
                        <Bar
                            options={chartOptions}
                            data={{
                                datasets: datasets.properties.data,
                                labels: datasets.properties.labels,
                            }}
                        />
                    </ChartContainer>

                    {/* Leads Summary */}
                    <ChartContainer
                        className={cx("sm:col-span-6", chartContainerClasses)}
                        title="Leads summary"
                    >
                        <div className="grid grid-cols-1 gap-8 sm:mx-auto xs:grid-cols-2 align-center">
                            {/* Leads left section - Counts */}
                            <div className="my-auto">
                                <div className="flex flex-col">
                                    <Text
                                        font={FontType.HEADING_M}
                                        weight={500}
                                        type="span"
                                        className="line"
                                    >
                                        {totalLeads}
                                    </Text>
                                    <Text
                                        className="mt-[-80]"
                                        font={FontType.LABEL_L}
                                    >
                                        Total Leads
                                    </Text>
                                </div>
                                <div className="grid grid-cols-2 mt-8 sm:mt-14 gap-6">
                                    {stats.leadStats.map((o) => (
                                        <div
                                            key={o.label}
                                            className="flex items-center flex-wrap"
                                        >
                                            <span
                                                className="w-3 h-3 inline rounded-md"
                                                style={{ background: o.color }}
                                            />
                                            <Text
                                                className="col-span-5 ml-3"
                                                font={FontType.SUBHEADING_S}
                                            >
                                                {o.count}
                                            </Text>
                                            <Text
                                                font={FontType.LABEL_M}
                                                className="basis-full ml-6"
                                            >
                                                {o.label}
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Leads right section - Chart */}
                            {totalLeads === 0 ? (
                                <Text
                                    className="self-center"
                                    font={FontType.SUBHEADING_S}
                                >
                                    Please create some leads
                                </Text>
                            ) : (
                                <div className="order-first md:order-none">
                                    <Doughnut
                                        options={{
                                            ...chartOptions,
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { display: false },
                                            },
                                            scales: undefined,
                                        }}
                                        data={{
                                            labels: datasets.leads.labels,
                                            datasets: datasets.leads.data,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </ChartContainer>

                    {/* Builder contact Summary */}
                    <ChartContainer
                        className={cx("sm:col-span-4", chartContainerClasses)}
                        title="Builder contact summary"
                    >
                        <Bar
                            options={chartOptions}
                            data={{
                                datasets: datasets.builder.data,
                                labels: datasets.builder.labels,
                            }}
                        />
                    </ChartContainer>

                    {/* Community Summary */}
                    {/*
                    <ChartContainer
                        className={cx("sm:col-span-6", chartContainerClasses)}
                        title="Community summary"
                    >
                        <div className="flex flex-wrap justify-evenly items-center grow gap-6 md:gap-12 px-12">
                            {[
                                {
                                    count: stats.communityStats.propertyPosted,
                                    label: "Properties posted",
                                    backgroundColor: "#7D6BF033",
                                },
                                {
                                    count: stats.communityStats.propertySearch,
                                    label: "Properties searched",
                                    backgroundColor: "#3FC46E33",
                                },
                            ].map((o) => (
                                <div
                                    key={o.label}
                                    className="flex items-center justify-center rounded-full flex-col h-80 w-80"
                                    style={{ background: o.backgroundColor }}
                                >
                                    <Text font={FontType.SUBHEADING_M}>
                                        {o.count}
                                    </Text>
                                    <Text font={FontType.LABEL_M}>
                                        {o.label}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </ChartContainer> */}
                </div>
            )}
            <ToasterElement />
        </Layout>
    );
};

export default withAuth(ProtectedPage(BrokerPage(Dashboard)));
