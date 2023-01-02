export type PaymentType = {
    isOpen: boolean;
    onClose: (flag: boolean) => void;
};

export type PaymentStatusType = {
    buttonText: string;
    headingText: string;
    bodyText: string;
    imageSrc: any;
    onClick?: () => void;
};
