import React, { ReactElement } from "react";

export type ContactUpPropsType = {
    isOpen: boolean;
    onClose: (flag: boolean) => void;
};

export enum ContactUsFormKeys {
    COUNTRY_CODE = "country_code",
    MOBILE_NUMBER = "mobile_number",
    FULL_NAME = "fullName",
    MESSAGE = "Message",
}

export type ContactUsFormType = {
    [key in ContactUsFormKeys]: string;
};

export type ContactUpFormPageType = {
    handleFormInputValues: (
        e?: React.FormEvent<HTMLInputElement>,
        e2?: any
    ) => void;
    formValues: ContactUsFormType;
    onSubmit: () => void;
    isLoading?: boolean;
    errorMessages?: any;
};

export type ContactUsRequestType = {
    countryCode: string;
    mobileNumber: string;
    name: string;
    query: string;
};