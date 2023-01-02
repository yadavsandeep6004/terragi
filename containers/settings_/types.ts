export type OptionType = { key: any; value: any; text: any };

export enum FormKeys {
    FULL_NAME = "fullName",
    EMAIL = "email",
    MOBILE = "mobileNumber",
    COUNTRY_CODE = "countryCode",
    PASSWORD = "password",
    CONFIRM_PASSWORD = "confirmPassword",
    // OTP = "otp",
    PLATFORM_OPTIONS = "platformType",
    MEMBER_PASSWORD = "memberpassword",
}

export type FormType = {
    [key in FormKeys]: string;
};

export type SettingRequestType = {
    countryCode?: string;
    mobileNumber?: string;
    password: string;
    // otp: string;
};

export type MemberRequestType = {
    [FormKeys.FULL_NAME]: string;
    email: string;
    countryCode?: string;
    mobileNumber?: string;
    password: string;
};
