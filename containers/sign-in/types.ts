import { ChangeEvent } from "react";

export type SignInPropsType = {
    isOpen: boolean;
    onClose: (flag: boolean) => void;
};

export type SignInForm = {
    handleFormInputValues: (e: ChangeEvent, e2: any) => void;
    formValues: SignInFormType;
    onSubmit: () => void;
    toggleButton: () => void;
};

export enum SignInFormKeys {
    COUNTRY_CODE = "country_code",
    MOBILE_NUMBER = "mobile_number",
    PASSWORD = "password",
}

export type SignInFormType = {
    [key in SignInFormKeys]: string;
};

export type SignInRequestType = {
    countryCode: string;
    password: string;
    mobileNumber: string;
};

export type SignInResponse = {
    token: string;
};
