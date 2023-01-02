export type IntegrateLeadType = {
    isOpen: boolean;
    formValues: IntegrateFormType;
    onClose: (e: any) => void;
    onSubmit: Function;
    onChange: (e?: any, e2?: any) => void;
};

export enum IntegrateLeadKeys {
    EMAIL = "email",
    PASSWORD = "password",
    PLATFORM_TYPE = "platformtype",
}

export type IntegrateFormType = { [key in IntegrateLeadKeys]: string };

export enum LeadType {
    MAGICBRICKS = "MagicBricks",
    ACRES = "99Acres",
}

export type IntegrateLeadResponseType = {
    email: string;
    password: string;
};
