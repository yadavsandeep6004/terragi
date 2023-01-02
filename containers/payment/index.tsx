/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useMemo, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Card } from "../../components/card";
import { PlanCardLayout } from "./plan-details";
import { PaymentStatusLayout } from "./status-modal";
import { Modal } from "../../components/modal";

import paymentFailed from "../../assets/images/payment-failed.png";
import paymentSuccess from "../../assets/images/payment-success.png";
import { card } from "./plan-details/constants";
import { useApi } from "../../hooks/useApi";
import {
    CREATE_ORDERS_URL,
    RAZORPAY_SDK_URL,
    REFRESH_TOKEN,
    VERIFY_ORDERS_URL,
} from "../../api/url";
import {
    CreateOrdersRequestType,
    CreateOrdersResponseType,
    VerifyOrderRequestType,
    VerifyOrderResponseType,
    StatusModalType,
} from "./types";

import styles from "./payment.module.scss";

import { ToastVariant, useToast } from "../../hooks/useToast";
import { PLAN_TYPE } from "../../utils/constants";
import { getUserDetails } from "../../store/user";

const RAZORPAY_KEY = `${process.env.NEXT_PUBLIC_RAZORPAY_KEY}`;

const STATUS_MODAL = {
    success: {
        headingText: "Payment Success",
        bodyText:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageSrc: paymentSuccess,
        buttonText: "Research property",
        onClick: () => {},
    },
    failed: {
        headingText: "Payemnt Failed",
        bodyText:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageSrc: paymentFailed,
        buttonText: "Try Again",
        onClick: () => {}, // call handlePlanPurchasing
    },
};

export const Payments: React.FC = () => {
    const [open, setOpen] = useState<StatusModalType | null>(null);
    const { toast, ToasterElement } = useToast();
    const user = useSelector(getUserDetails);
    const availablePlans = useMemo(
        () => card.filter((card: any) => card.id !== user?.planId),
        [user]
    );

    const clientApi = useApi();
    const router = useRouter();

    const refreshTokenProcedure = async () => {
        const response = await clientApi.get<{ token: string }>({
            url: REFRESH_TOKEN,
        });
        if (response.isSuccessful) {
            localStorage.setItem("token", response.data.token);
            router.reload();
        } else {
            console.log("TOKEN NOT REFRESHED");
        }
    };

    const loadScript = (src: string) =>
        new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });

    const handlePlanPurchasing = async (amount: number) => {
        const planType =
            amount === card[0].amount ? PLAN_TYPE.PRO : PLAN_TYPE.BASIC;
        const plan = card.find((i) => i.id === planType);

        if (!plan) {
            return;
        }
        // Loading Razorpay SDK
        await loadScript(RAZORPAY_SDK_URL);

        // Creating order_id
        const response = await clientApi?.post<
            CreateOrdersRequestType,
            CreateOrdersResponseType
        >({
            url: `${CREATE_ORDERS_URL}`,
            body: { planId: planType },
        });

        if (response.isSuccessful) {
            const { orderId } = response.data;

            if (!orderId) {
                toast({
                    variant: ToastVariant.ERROR,
                    message: "Something went wrong! Please try again later.",
                });
                return;
            }

            // Sending orderId to Razorpay
            const options = {
                key: RAZORPAY_KEY,
                amount: `${amount * 100}`,
                currency: "INR",
                name: "Terragi",
                description: plan.headingText,
                order_id: orderId,
                async handler(razrRes: any) {
                    const body = {
                        paymentId: razrRes.razorpay_payment_id,
                        orderId: razrRes.razorpay_order_id,
                        signature: razrRes.razorpay_signature,
                    };
                    // Verifying order
                    const res = await clientApi?.post<
                        VerifyOrderRequestType,
                        VerifyOrderResponseType
                    >({
                        url: VERIFY_ORDERS_URL,
                        body,
                    });

                    if (res.isSuccessful) {
                        await refreshTokenProcedure();
                        // setOpen(STATUS_MODAL.success);
                    } else setOpen(STATUS_MODAL.failed);
                },
                theme: {
                    color: "#3975ea",
                },
                modal: {
                    confirm_close: true,
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } else {
            setOpen(STATUS_MODAL.failed);
        }
    };

    return (
        <div className="flex p-12 h-full">
            <Modal
                className={styles.modal__container}
                isOpen={open !== null}
                onClose={() => setOpen(null)}
            >
                <PaymentStatusLayout
                    imageSrc={open?.imageSrc}
                    headingText={open?.headingText || ""}
                    bodyText={open?.bodyText || ""}
                    buttonText={open?.buttonText || ""}
                    onClick={() => setOpen(null)}
                />
            </Modal>

            <div
                className={cx(
                    "inline-flex gap-5 justify-center m-auto",
                    styles.payments_container
                )}
            >
                {availablePlans?.map((e) => (
                    <Card className={styles.card_container} key={e.amount}>
                        <PlanCardLayout
                            headingText={e.headingText}
                            amount={e.amount}
                            services={e.services}
                            onClick={() => handlePlanPurchasing(e.amount)}
                        />
                    </Card>
                ))}
            </div>
            <ToasterElement />
        </div>
    );
};
