import React from "react";

import { useRouter } from "next/router";

import { useApi } from "../../../../hooks/useApi";
import { withAuth } from "../../../../hoc/withAuth";
import { ProtectedPage } from "../../../../components/protected-page";
import MatchingShowed from "../../../../containers/leads/matching-showed";
import { GET_SHOWED_PROPERTIES } from "../../../../api/url";
import { PropertiesBaseResponse } from "../../../../containers/home-section/types";
import { PropertyDataType } from "../../../../components/properties-card";
import { BrokerPage } from "../../../../hoc/BrokerPage";

export type GetShowedPropertyResponse = PropertiesBaseResponse<
    {
        _id: string;
        leadId: string;
        propertyId: string;
        createdAt: string;
        updatedAt: string;
        propertyData: PropertyDataType;
    }[]
>;

const ShowedProperties = () => {
    const router = useRouter();
    const clientApi = useApi();

    const getProperty = async () => {
        const response = await clientApi.get<GetShowedPropertyResponse>({
            url: GET_SHOWED_PROPERTIES,
            query: {
                ...router.query,
                include: JSON.stringify(["totalDocs"]),
            },
        });

        if (response.isSuccessful) {
            return response.data;
        }

        return {
            docs: [],
            totalDocs: 0,
        };
    };

    return (
        <MatchingShowed
            getPropertyHelper={getProperty}
            heading="Showed Properties"
            showLeadTime
        />
    );
};

export default withAuth(ProtectedPage(BrokerPage(ShowedProperties)));
