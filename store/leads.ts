import { createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { LeadsResponseType } from "../api/helpers";

export const leads = createSlice({
    name: "leads",
    initialState: {
        leads: null,
    },
    reducers: {
        setLeadsDetails: (state, action) => {
            const leadsDetails = action.payload;
            state.leads = leadsDetails;
        },
    },
});
export const { setLeadsDetails } = leads.actions;
export const getLeadsDetailList = (
    state: RootState
): LeadsResponseType | null => state.leads.leads;

export default leads.reducer;
