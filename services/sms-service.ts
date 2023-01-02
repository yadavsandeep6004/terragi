import { SEND_OTP } from "../api/url";
import { useApi } from "../hooks/useApi";

const api = useApi();

export const sendOtp = async (mobileNumber: string) =>
    api.post({
        url: SEND_OTP,
        body: {
            countryCode: "+91",
            mobileNumber,
        },
    });
