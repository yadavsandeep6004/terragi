export enum ResetPasswordFormKeys {
    MOBILE = "mobileNumber",
    PASSWORD = "password",
    CONFIRM_PASSWORD = "confirmPassword",
    OTP = "otp",
    COUNTRY_CODE = "countryCode",
}

export type ResetPasswordFormType = {
    [key in ResetPasswordFormKeys]: string;
};

export type ResetPasswordRequestType = {
    countryCode: string;
    mobileNumber: string;
    password: string;
    otp: string;
};

export type ResetPasswordResponseType = {
    countryCode: string;
    mobileNumber: string;
    password: string;
    otp: string;
};
