import { useApi } from "../../hooks/useApi";
import { USER_STATS } from "../../api/url";
import { UserStatsType } from "./types";

const api = useApi();
export const getStats = async () => api.get<UserStatsType>({ url: USER_STATS });
