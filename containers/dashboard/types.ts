export type UserStatsType = {
    propertyStats: {
        last30Days: {
            propertySearch: number;
            bookmark: number;
            shownToClients: number;
        };
        last90Days: {
            propertySearch: number;
            bookmark: number;
            shownToClients: number;
        };
    };
    contactBuilderStats: {
        last30Days: {
            numberView: number;
            builderCall: number;
        };
        last90Days: {
            numberView: number;
            builderCall: number;
        };
    };
    leadStats: { label: string; count: number; color: string }[];
    communityStats: {
        propertyPosted: number;
        propertySearch: number;
    };
};
