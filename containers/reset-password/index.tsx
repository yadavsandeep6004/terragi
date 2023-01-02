import React, { useCallback, useMemo, useState } from "react";
import cx from "classnames";

import { useRouter } from "next/router";

import { OtpVerificationModal } from "../../components/otp-verification-modal";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { FontType, Text } from "../../components/text";
import { ResetPasswordFormType, ResetPasswordFormKeys } from "./types";
import { Label } from "../../components/label";
import { Dropdown } from "../../components/dropdown";
import {
    COUNTRY_CODES,
    MOBILE_PHONE_REGEX,
    PASSWORD_REGEX,
} from "../../utils/constants";
import EyePass from "../../assets/icon/eyepass.svg";
import EyeSlash from "../../assets/icon/eye-slash.svg";

import styles from "./password.module.scss";
import { useApi } from "../../hooks/useApi";
import { ToastVariant, useToast } from "../../hooks/useToast";
import { FORGOT_PASS_SEND_OTP, SEND_OTP } from "../../api/url";
import { ROUTES } from "../../utils/routes";

//
// s0: mobileNumber input, send otp button
// s1: otp inpout, verify otp
// s2: password, confirm password, update button

export const ResetPasswordContainer = () => {
    const [step, setStep] = useState(0);
    const [token, setToken] = useState();
    const [formValues, setFormValues] = useState<ResetPasswordFormType>({
        [ResetPasswordFormKeys.COUNTRY_CODE]: "+91",
        [ResetPasswordFormKeys.MOBILE]: "",
        [ResetPasswordFormKeys.PASSWORD]: "",
        [ResetPasswordFormKeys.CONFIRM_PASSWORD]: "",
        [ResetPasswordFormKeys.OTP]: "",
    });

    const [errorMessage, setErrorMessage] = useState<any>({});
    const [shownPass, setShownPass] = useState(false);
    const [shownConfirmPass, setShownConfirmPass] = useState(false);

    const apiClient = useApi();
    const { ToasterElement, toast } = useToast();
    const router = useRouter();

    const checkInputValidation = (
        key: string,
        message: string,
        condition: boolean
    ) => {
        if (condition) {
            setErrorMessage((p: any) => ({
                ...p,
                [key]: message,
            }));
            return false;
        }
        setErrorMessage((p: any) => ({
            ...p,
            [key]: null,
        }));
        return true;
    };

    const validateInput = (key: ResetPasswordFormKeys) => {
        const value = formValues[key];
        switch (key) {
            case ResetPasswordFormKeys.PASSWORD:
                return checkInputValidation(
                    ResetPasswordFormKeys.PASSWORD,
                    "Passoword must contain atleast 8 characters",
                    !PASSWORD_REGEX.test(value)
                );
            case ResetPasswordFormKeys.CONFIRM_PASSWORD:
                return checkInputValidation(
                    ResetPasswordFormKeys.CONFIRM_PASSWORD,
                    "Password must be same",
                    formValues[ResetPasswordFormKeys.PASSWORD] !== value
                );

            case ResetPasswordFormKeys.COUNTRY_CODE:
                return checkInputValidation(
                    ResetPasswordFormKeys.COUNTRY_CODE,
                    "Please select country code",
                    value === ""
                );
            case ResetPasswordFormKeys.MOBILE:
                return checkInputValidation(
                    ResetPasswordFormKeys.MOBILE,
                    "Please enter valid mobile number",
                    !MOBILE_PHONE_REGEX.test(value)
                );

            default:
                return true;
        }
    };

    // const getRequestBody = (): ResetPasswordRequestType | null => {
    //     const password = formValues[ResetPasswordFormKeys.PASSWORD];
    //     const mobileNumber = formValues[ResetPasswordFormKeys.MOBILE];
    //     const countryCode = formValues[ResetPasswordFormKeys.COUNTRY_CODE];
    //     const otp = formValues[ResetPasswordFormKeys.OTP];

    //     const finalBody: ResetPasswordRequestType = {
    //         password,
    //         mobileNumber,
    //         countryCode,
    //         otp,
    //     };

    //     return finalBody;
    // };

    const handleOnClick = async () => {
        let flag = true;

        const keysToCheck = [
            ResetPasswordFormKeys.MOBILE,
            ResetPasswordFormKeys.PASSWORD,
            ResetPasswordFormKeys.CONFIRM_PASSWORD,
        ];

        keysToCheck.forEach((e) => {
            flag = validateInput(e as ResetPasswordFormKeys) && flag;
        });

        if (flag) {
            const res = await apiClient.post({
                url: "auth/password/update",
                body: {
                    mobileNumber: formValues.mobileNumber,
                    token,
                    countryCode: formValues.countryCode,
                    password: formValues.password,
                },
            });
            if (res.isSuccessful) {
                toast({ message: res.message, variant: ToastVariant.SUCCESS });
                router.push(`/${ROUTES.auth.signin}`);
            } else {
                toast({ message: res.message, variant: ToastVariant.ERROR });
            }
        }
    };

    // const onSubmit = async (otp: any) => {
    //     formValues[ResetPasswordFormKeys.OTP] = otp;
    //     const validationResult = getRequestBody();

    //     if (validationResult) {
    //         const response = await apiClient.post<
    //             ResetPasswordRequestType,
    //             ResetPasswordResponseType
    //         >({
    //             url: RESET_PASSWORD,
    //             body: validationResult,
    //         });
    //         if (response.isSuccessful) {
    //             toast({
    //                 variant: ToastVariant.SUCCESS,
    //                 message: "Password Updated",
    //             });
    //             router.push(`/${ROUTES.auth.signin}`);
    //         } else {
    //             toast({
    //                 variant: ToastVariant.ERROR,
    //                 message: response.message,
    //             });
    //         }
    //     }
    // };

    const handleFormInputValues = useCallback((e?: any, e2?: any) => {
        const rightEvent = e2 || e.target;
        const { name } = rightEvent;
        const { value } = rightEvent;
        if (name === ResetPasswordFormKeys.MOBILE && value.length > 10) return;
        setFormValues((p) => ({ ...p, [name]: value }));
    }, []);

    const countryCodes = useMemo(() => COUNTRY_CODES, []);

    return (
        <div
            className={cx(
                "flex  justify-center mt-[90px] p-4 md:p-0",
                styles.reset_password_wrapper
            )}
        >
            <div
                className={cx(
                    "p-5 md:p-10",
                    styles.reset_password_from_wrapper
                )}
            >
                <Text font={FontType.HEADING_L} weight={600}>
                    Forgot Password
                </Text>
                <div className="mt-8 flex flex-col gap-8">
                    {step === 0 && (
                        <div>
                            <Label label="Mobile Number" />
                            <div className="flex flex-1 gap-5">
                                <Dropdown
                                    name="country_code"
                                    options={countryCodes}
                                    value={
                                        formValues[
                                            ResetPasswordFormKeys.COUNTRY_CODE
                                        ]
                                    }
                                    search
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessage[
                                            ResetPasswordFormKeys.COUNTRY_CODE
                                        ]
                                    }
                                    disabled
                                />
                                <Input
                                    name={ResetPasswordFormKeys.MOBILE}
                                    wrapperClassName="flex-1"
                                    value={
                                        formValues[ResetPasswordFormKeys.MOBILE]
                                    }
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessage[
                                            ResetPasswordFormKeys.MOBILE
                                        ]
                                    }
                                    type="number"
                                />
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <>
                            <div className="relative">
                                <Input
                                    name={ResetPasswordFormKeys.PASSWORD}
                                    type={shownPass ? "text" : "password"}
                                    onChange={handleFormInputValues}
                                    value={
                                        formValues[
                                            ResetPasswordFormKeys.PASSWORD
                                        ]
                                    }
                                    label="New password"
                                    wrapperClassName="flex-1 relative"
                                    errorMessage={
                                        errorMessage[
                                            ResetPasswordFormKeys.PASSWORD
                                        ]
                                    }
                                />
                                {shownPass ? (
                                    <EyePass
                                        height={20}
                                        width={20}
                                        className="absolute right-3 bottom-5"
                                        onClick={() => {
                                            setShownPass(!shownPass);
                                        }}
                                    />
                                ) : (
                                    <EyeSlash
                                        height={20}
                                        width={20}
                                        className="absolute right-3 bottom-5"
                                        onClick={() => {
                                            setShownPass(!shownPass);
                                        }}
                                    />
                                )}
                            </div>

                            <div className="relative">
                                <Input
                                    name={
                                        ResetPasswordFormKeys.CONFIRM_PASSWORD
                                    }
                                    type={
                                        shownConfirmPass ? "text" : "password"
                                    }
                                    onChange={handleFormInputValues}
                                    value={
                                        formValues[
                                            ResetPasswordFormKeys
                                                .CONFIRM_PASSWORD
                                        ]
                                    }
                                    label="Confirm Password"
                                    wrapperClassName="flex-1"
                                    errorMessage={
                                        errorMessage[
                                            ResetPasswordFormKeys
                                                .CONFIRM_PASSWORD
                                        ]
                                    }
                                />

                                {shownConfirmPass ? (
                                    <EyePass
                                        height={20}
                                        width={20}
                                        className="absolute right-3 bottom-5"
                                        onClick={() => {
                                            setShownConfirmPass(
                                                !shownConfirmPass
                                            );
                                        }}
                                    />
                                ) : (
                                    <EyeSlash
                                        height={20}
                                        width={20}
                                        className="absolute right-3 bottom-5"
                                        onClick={() => {
                                            setShownConfirmPass(
                                                !shownConfirmPass
                                            );
                                        }}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
                {step === 0 && (
                    <Button
                        className={styles.submit_btn}
                        onClick={async () => {
                            if (!validateInput(ResetPasswordFormKeys.MOBILE)) {
                                return;
                            }
                            const res = await apiClient.post({
                                url: FORGOT_PASS_SEND_OTP,
                                body: {
                                    mobileNumber: formValues.mobileNumber,
                                    countryCode: "+91",
                                },
                            });
                            if (res.isSuccessful) {
                                setStep(1);
                            } else {
                                toast({
                                    message: res.message,
                                    variant: ToastVariant.ERROR,
                                });
                            }
                        }}
                        fluid
                        type="submit"
                    >
                        Send OTP
                    </Button>
                )}
                {step === 1 && (
                    <Button
                        className={styles.submit_btn}
                        onClick={handleOnClick}
                        fluid
                        type="submit"
                    >
                        Verify OTP
                    </Button>
                )}
                {step === 2 && (
                    <Button
                        className={styles.submit_btn}
                        onClick={handleOnClick}
                        fluid
                        type="submit"
                    >
                        Update
                    </Button>
                )}
                <OtpVerificationModal
                    isOpen={step === 1}
                    onClose={() => {
                        setStep(0);
                    }}
                    onSubmit={async (otp) => {
                        const res = await apiClient.post({
                            url: "auth/password/update/otp/verify",
                            body: {
                                mobileNumber: formValues.mobileNumber,
                                otp,
                            },
                        });
                        if (res.isSuccessful) {
                            setStep(2);
                            const { token: t } = res.data;
                            if (t) setToken(t);
                            else {
                                toast({
                                    message: "Invalid response",
                                    variant: ToastVariant.ERROR,
                                });
                                setStep(0);
                            }
                        } else {
                            toast({
                                message: res.message,
                                variant: ToastVariant.ERROR,
                            });
                        }
                    }}
                />
                <ToasterElement />
            </div>
        </div>
    );
};
