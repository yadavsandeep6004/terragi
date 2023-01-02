import React, { ReactElement, useCallback } from "react";
import hToast, { Toaster, ToasterProps } from "react-hot-toast";

export enum ToastVariant {
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    PROMISE = "promise",
    CUSTOM = "custom",
}

type ToastParams = {
    variant: ToastVariant;
    promiseCallback?: Promise<unknown>;
    promiseConfig?: {
        loading: string;
        success: JSX.Element;
        error: JSX.Element;
    };
    message?: string;
    customElement?: ReactElement;
};

export const useToast = (props?: ToasterProps) => {
    const getToastFunction = useCallback((params: ToastParams) => {
        switch (params.variant) {
            case ToastVariant.SUCCESS:
                return () => hToast.success(params.message || "");
            case ToastVariant.ERROR:
                return () => hToast.error(params.message || "");
            case ToastVariant.PROMISE:
                return () =>
                    params.promiseCallback &&
                    params.promiseConfig &&
                    hToast.promise(
                        params.promiseCallback,
                        params.promiseConfig
                    );
            default:
                return () =>
                    params.customElement && hToast.custom(params.customElement);
        }
    }, []);

    const toast = useCallback(
        (params: ToastParams) => {
            const toastFunction = getToastFunction(params);
            toastFunction();
        },
        [getToastFunction]
    );

    const {
        position = "top-center",
        reverseOrder = true,
        containerStyle = {
            width: "100%",
            fontWeight: 600,
            fontSize: "16px",
            fontFamily: "Poppins",
        },
        ...rest
    } = props || {};

    const ToasterElement = useCallback(
        () => (
            <Toaster
                toastOptions={{
                    success: { duration: 6000 },
                    error: { duration: 6000 },
                    custom: { duration: 6000 },
                    blank: { duration: 6000 },
                }}
                position={position}
                reverseOrder={reverseOrder}
                containerStyle={containerStyle}
                {...rest}
            />
        ),
        []
    );

    return { toast, ToasterElement };
};
