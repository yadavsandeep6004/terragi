import React, { ReactElement } from "react";

export type SignUpPropsType = {
    isOpen: boolean;
    onClose: (flag: boolean) => void;
};

export type SignUpFormFirstPageType = {
    handleFormInputValues: (
        e?: React.FormEvent<HTMLInputElement>,
        e2?: any
    ) => void;
    formValues: SignUpFormType;
    onSubmit: () => void;
    isLoading?: boolean;
    errorMessages?: any;
};

export type SignUpFormSecondPageType = SignUpFormFirstPageType & {
    setPage: () => void;
};

export enum SignUpFormKeys {
    FULL_NAME = "fullName",
    EMAIL = "email",
    MOBILE = "mobileNumber",
    GENDER = "gender",
    DOB = "dob",
    EXPERIENCE = "experience",
    PROFESSION = "userType",
    COUNTRY_CODE = "countryCode",
    PASSWORD = "password",
    CONFIRM_PASSWORD = "confirmPassword",
    OTP = "otp",
    REFERRAL_CODE = "referredBy",
}

export enum ProfessionType {
    BUILDER = "builder",
    BUYER = "buyer",
}

export type SignUpFormType = {
    [key in SignUpFormKeys]: string;
};

export type SignUpRequestType = {
    userType: string;
    fullName: string;
    countryCode: string;
    mobileNumber: string;
    gender: string;
    dob: string;
    experience: number;
    password: string;
    otp: string;
    email?: string;
    referredBy?: string | string[];
};

export type SignUpGenericPageType = {
    onSubmit: () => void;
    signUpDesc: string;
    buttonText: string;
    heading: string;
    buttonDesc?: string | ReactElement;
    isLoading?: boolean;
     BENEFITS_DATA ?:string[]
};

export type SignUpResponseType = {
    userType: string;
    fullName: string;
    countryCode: string;
    mobileNumber: string;
    gender: string;
    email: string;
    dob: string;
    experience: number;
    password: string;
    referredBy: string | string[];
    _id: string;
};
