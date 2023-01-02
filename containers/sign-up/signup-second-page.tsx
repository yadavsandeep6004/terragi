import React, { PropsWithChildren, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Icon } from "semantic-ui-react";

import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { ColorType, FontType, Text } from "../../components/text";
import { SignUpGenericPage } from "./signup-generic-page";
import EyeSlash from "../../assets/icon/eye-slash.svg";
import EyePass from "../../assets/icon/eyepass.svg";

import styles from "./signup.module.scss";
import { SignUpFormKeys, SignUpFormSecondPageType } from "./types";
import { sendOtp } from "../../services/sms-service";
import { ToastVariant, useToast } from "../../hooks/useToast";

export const SignupSecondPage: React.FC<
    PropsWithChildren<SignUpFormSecondPageType>
> = ({
    onSubmit,
    handleFormInputValues,
    formValues,
    isLoading,
    setPage,
    errorMessages,
}) => {
        const [shownPass, setShownPass] = useState(false);
        const [shownConfirmPass, setShownConfirmPass] = useState(false);
        const { toast, ToasterElement } = useToast();





        const sendOtpHelper = () => {
            sendOtp(formValues[SignUpFormKeys.MOBILE]).then((response) => {
                if (response.code === 200) {
                    toast({ variant: ToastVariant.SUCCESS, message: "OTP sent" });
                } else {
                    toast({
                        variant: ToastVariant.ERROR,
                        message: response.message,
                    });
                }
            });
        };

        // useEffect(() => {
        //     sendOtpHelper();
        // }, []);

        return (
            <SignUpGenericPage
                buttonText="Submit"
                signUpDesc="Set your password and enter OTP which we have send to your mobile number"
                onSubmit={onSubmit}
                isLoading={isLoading}
                heading="Sign Up"

            >
                <>
                    <Text
                        className="mb-5 ml-auto cursor-pointer"
                        font={FontType.LABEL_L}
                        color={ColorType.PRIMARY}
                        weight={500}
                        onClick={setPage}
                    >
                        &larr; Back
                    </Text>
                    <div className="flex flex-col gap-8">
                        <div className="relative">
                            <Input
                                type={shownPass ? "text" : "password"}
                                name={SignUpFormKeys.PASSWORD}
                                label="Password"
                                value={formValues[SignUpFormKeys.PASSWORD]}
                                onChange={handleFormInputValues}
                                errorMessage={
                                    errorMessages[SignUpFormKeys.PASSWORD]
                                }
                                required
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
                                type={shownConfirmPass ? "text" : "password"}
                                name={SignUpFormKeys.CONFIRM_PASSWORD}
                                label="Confirm Password"
                                value={formValues[SignUpFormKeys.CONFIRM_PASSWORD]}
                                errorMessage={
                                    errorMessages[SignUpFormKeys.CONFIRM_PASSWORD]
                                }
                                onChange={handleFormInputValues}
                                required
                            />
                            {shownConfirmPass ? (
                                <EyePass
                                    height={20}
                                    width={20}
                                    className="absolute right-3 bottom-5"
                                    onClick={() => {
                                        setShownConfirmPass(!shownConfirmPass);
                                    }}
                                />
                            ) : (
                                <EyeSlash
                                    height={20}
                                    width={20}
                                    className="absolute right-3 bottom-5"
                                    onClick={() => {
                                        setShownConfirmPass(!shownConfirmPass);
                                    }}
                                />
                            )}
                        </div>

                        <div className="w-full ">
                            <Label label="OTP" required />
                            <OtpInput
                                value={formValues[SignUpFormKeys.OTP] as string}
                                onChange={(e: any) => {
                                    const event = {
                                        name: SignUpFormKeys.OTP,
                                        value: e.toString(),
                                    };
                                    handleFormInputValues(undefined, event);
                                }}
                                numInputs={4}
                                containerStyle={styles.childOtp}
                                isInputNum
                            />
                        </div>
                        <Text
                            className="mb-5 ml-auto cursor-pointer"
                            onClick={sendOtpHelper}
                            font={FontType.LABEL_L}
                            weight={400}
                            color={ColorType.PRIMARY}
                        >
                            Resend OTP
                        </Text>
                    </div>
                </>
            </SignUpGenericPage>
        );
    };
