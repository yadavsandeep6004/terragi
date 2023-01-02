export enum ProfileFormKeys {
    EMAIL = "email",
    MOBILE = "mobileNumber",
    ALTERNATE_NUMBER = "alternateNumber",
    GENDER = "gender",
    DOB = "dob",
    EXPERIENCE = "experience",
    COUNTRY_CODE = "countryCode",
    ADDRESS = "officeAddress",
    PROFILE_IMAGE = "profileImage",
}

export type ProfileFormType = {
    [key in ProfileFormKeys]: string;
};

export type ProfileGetRequestType = {
    email: string;
    mobileNumber: string;
    gender: string;
    dob: string;
    experience: number;
    countryCode: string;
    officeAddress: string;
    profileImage: string;
    alternateNumber?: {
        countryCode: string;
        mobileNumber: string;
        otp?: string;
    };
};

export type ProfileResponseType = {
    email: string;
    mobileNumber: string;
    alternateMobileNumber: string;
    gender: string;
    dob: string;
    experience: number;
    countryCode: string;
    officeAddress: string;
    profileImage: string;
};

export enum ProfileImageKey {
    PROFILE_IMAGE = "profileImage",
}
