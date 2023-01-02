import { LeadsResponseType } from "../api/helpers";
import { GET_LEADS } from "../api/url";
import { useApi } from "../hooks/useApi";

const clientApi = useApi();

export const getLeads = (query: any) =>
    clientApi.get<LeadsResponseType>({
        url: GET_LEADS,
        query,
    });
