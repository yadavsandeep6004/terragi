import { useApi } from "../hooks/useApi";
import { GET_USER } from "./url";

const clientApi = useApi();

export type UserResponseType = {
    _id: string;
    userType: string;
    fullName: string;
    countryCode: string;
    mobileNumber: string;
    gender: string;
    email: string;
    dob: string;
    experience: number;
    referralCode: string;
    planId: string;
    officeAddress: string;
    profileImage: string;
    alternateNumber: string;
    externalCredentials?:{"99Acres"?:{lastLoginSuccessful:boolean},MagicBricks?:{lastLoginSuccessful:boolean}};
};

export type LeadsResponseType = {
    docs: {
        _id: string;
        name: string;
        bhkType: string[];
        locality: string[];
        budgetMin: number;
        budgetMax: number;
        source: string;
    }[];
    totalDocs: number;
};

export const getUser = () =>
    clientApi.get<ResponseType>({
        url: GET_USER,
    });
