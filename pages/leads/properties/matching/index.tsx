import React, { useCallback } from "react";

import { useRouter } from "next/router";

import { useApi } from "../../../../hooks/useApi";
import { withAuth } from "../../../../hoc/withAuth";
import { ProtectedPage } from "../../../../components/protected-page";
import MatchingShowed from "../../../../containers/leads/matching-showed";
import { GetPropertyResponseType } from "../../../../containers/home-section/types";
import { GET_PROPERTIES, GET_SAVED_PROPERTIES } from "../../../../api/url";
import { BrokerPage } from "../../../../hoc/BrokerPage";

const MatchingProperies = () => {
    const router = useRouter();
    const clientApi = useApi();

    const addQueryToPath = (query = {}) => {
        router.query = {
            page: "1",
            pageSize: "10",
            ...query,
        };

        router.push(router, undefined, { shallow: true, scroll: true });
    };

    const getProperty = async () => {
        const response = await clientApi.get<GetPropertyResponseType>({
            url: GET_PROPERTIES,
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

    const onClickShownToLead = async (
        propertyId: string,
        isShownToLead: string
    ) => {
        const { leadId } = router.query;
        let response = null;
        if (isShownToLead) {
            response = await clientApi.delete({
                url: `${GET_SAVED_PROPERTIES}/${isShownToLead}`,
            });
        } else {
            response = await clientApi.post({
                url: GET_SAVED_PROPERTIES,
                body: { leadId, propertyId },
            });
        }

        return response.data || true;
    };

    const handleFilterChange = useCallback((order: string, type: string) => {
        addQueryToPath({
            ...router.query,
            sortBy: type,
            sortOrder: order,
        });
    }, []);

    return (
        <MatchingShowed
            getPropertyHelper={getProperty}
            heading="Matching Properties"
            onClickShownToLead={onClickShownToLead}
            handleFilterChange={handleFilterChange}
        />
    );
};

export default withAuth(ProtectedPage(BrokerPage(MatchingProperies)));
