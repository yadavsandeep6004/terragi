import { StaticImageData } from "next/image";

export type CreateOrdersRequestType = {
    planId: string;
};
export type CreateOrdersResponseType = {
    orderId: string;
};

export type VerifyOrderRequestType = {
    paymentId: string;
    orderId: string;
    signature: string;
};

export type VerifyOrderResponseType = {};

export type StatusModalType = {
    headingText: string;
    bodyText: string;
    imageSrc: StaticImageData;
    buttonText: string;
    onClick: () => void;
};
