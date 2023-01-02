import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { LOGIN_URL, SIGNUP_URL } from "../../api/url";

import { Modal } from "../../components/modal";
import { useApi } from "../../hooks/useApi";
import { ToastVariant, useToast } from "../../hooks/useToast";
import { sendOtp } from "../../services/sms-service";
import { loginSuccess } from "../../store/user";
import {
    EMAIL_CHECK_REGEX,
    MOBILE_PHONE_REGEX,
    PASSWORD_REGEX,
} from "../../utils/constants";
import {
    getQueryParamsByKey,
    getReliableDateFormat,
} from "../../utils/helpers";
import { SignInRequestType, SignInResponse } from "../sign-in/types";
import { SignupFirstPage } from "./signup-first-page";
import { SignupSecondPage } from "./signup-second-page";

import {
    SignUpFormKeys,
    SignUpFormType,
    SignUpRequestType,
    SignUpPropsType,
    SignUpResponseType,
} from "./types";

export const SignUp: React.FC<SignUpPropsType> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const refCode = router.query.referralCode as string | undefined;
    const [formValues, setFormValues] = useState<SignUpFormType>({
        [SignUpFormKeys.DOB]: "",
        [SignUpFormKeys.EMAIL]: "",
        [SignUpFormKeys.EXPERIENCE]: "",
        [SignUpFormKeys.FULL_NAME]: "",
        [SignUpFormKeys.GENDER]: "",
        [SignUpFormKeys.MOBILE]: "",
        [SignUpFormKeys.PROFESSION]: "Broker",
        [SignUpFormKeys.COUNTRY_CODE]: "+91",
        [SignUpFormKeys.PASSWORD]: "",
        [SignUpFormKeys.CONFIRM_PASSWORD]: "",
        [SignUpFormKeys.OTP]: "",
        [SignUpFormKeys.DOB]: "1998-April-12",
        [SignUpFormKeys.REFERRAL_CODE]: refCode || "",
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>({});

    const apiClient = useApi();
    const { ToasterElement, toast } = useToast();
    // const router = useRouter();
    const dispatch = useDispatch();

    useEffect(
        () => () => {
            setFormValues((p) => ({
                ...p,
                [SignUpFormKeys.PASSWORD]: "",
                [SignUpFormKeys.CONFIRM_PASSWORD]: "",
                [SignUpFormKeys.OTP]: "",
            }));
            setPage(1);
        },
        []
    );

    const sendOtpHelper = () => {
        sendOtp(formValues[SignUpFormKeys.MOBILE]).then((response) => {
            if (response.code === 200) {
                toast({ variant: ToastVariant.SUCCESS, message: "OTP sent" });
                setPage(2);
            } else {
                toast({
                    variant: ToastVariant.ERROR,
                    message: response.message,
                });
            }
        });
    };

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

    const validateInput = (key: SignUpFormKeys) => {
        const value = formValues[key];
        switch (key) {
            case SignUpFormKeys.PASSWORD:
                return checkInputValidation(
                    SignUpFormKeys.PASSWORD,
                    "Passoword must contain atleast 8 characters",
                    !PASSWORD_REGEX.test(value)
                );
            case SignUpFormKeys.CONFIRM_PASSWORD:
                return checkInputValidation(
                    SignUpFormKeys.CONFIRM_PASSWORD,
                    "Passoword must contain atleast 8 characters",
                    formValues[SignUpFormKeys.PASSWORD] !== value
                );
            case SignUpFormKeys.EMAIL:
                return checkInputValidation(
                    SignUpFormKeys.EMAIL,
                    "Please enter valid email.",
                    value !== "" && !EMAIL_CHECK_REGEX?.test(value)
                );
            // case SignUpFormKeys.DOB:
            //     return checkInputValidation(
            //         SignUpFormKeys.DOB,
            //         "Please enter date of birth.",
            //         value === ""
            //     );
            // case SignUpFormKeys.EXPERIENCE:
            //     return checkInputValidation(
            //         SignUpFormKeys.EXPERIENCE,
            //         "Please enter expierence level.",
            //         value === ""
            //     );
            case SignUpFormKeys.FULL_NAME:
                return checkInputValidation(
                    SignUpFormKeys.FULL_NAME,
                    "Please enter your full name.",
                    value === ""
                );
            case SignUpFormKeys.PROFESSION:
                return checkInputValidation(
                    SignUpFormKeys.PROFESSION,
                    "Please state your profession.",
                    value === ""
                );
            case SignUpFormKeys.GENDER:
                return checkInputValidation(
                    SignUpFormKeys.GENDER,
                    "Please select your gender",
                    value === ""
                );
            case SignUpFormKeys.COUNTRY_CODE:
                return checkInputValidation(
                    SignUpFormKeys.COUNTRY_CODE,
                    "Please select country code",
                    value === ""
                );
            case SignUpFormKeys.MOBILE:
                return checkInputValidation(
                    SignUpFormKeys.MOBILE,
                    "Please enter valid mobile number",
                    !MOBILE_PHONE_REGEX.test(value)
                );
            default:
                return true;
        }
    };

    const getRequestBody = (): SignUpRequestType | null => {
        const password = formValues[SignUpFormKeys.PASSWORD];
        const mobileNumber = formValues[SignUpFormKeys.MOBILE];
        const email = formValues[SignUpFormKeys.EMAIL];
        const dob = formValues[SignUpFormKeys.DOB];
        const countryCode = formValues[SignUpFormKeys.COUNTRY_CODE];
        const userType = formValues[SignUpFormKeys.PROFESSION].toLowerCase();
        const fullName = formValues[SignUpFormKeys.FULL_NAME];
        const gender = formValues[SignUpFormKeys.GENDER];
        const experience = formValues[SignUpFormKeys.EXPERIENCE];
        const otp = formValues[SignUpFormKeys.OTP];
        const referredBy = formValues[SignUpFormKeys.REFERRAL_CODE];

        const finalBody: SignUpRequestType = {
            userType,
            fullName,
            countryCode,
            mobileNumber,
            gender,
            password,
            otp,
            dob: getReliableDateFormat(dob),
            experience: +experience,
            referredBy,
        };

        const referralCode = getQueryParamsByKey("r");

        if (referralCode) finalBody.referredBy = referralCode;
        if (email !== "") finalBody.email = email;
        console.log(finalBody);
        return finalBody;
    };

    const loginProcedure = async () => {
        const response = await apiClient.post<
            SignInRequestType,
            SignInResponse
        >({
            url: LOGIN_URL,
            body: {
                [SignUpFormKeys.COUNTRY_CODE]:
                    formValues[SignUpFormKeys.COUNTRY_CODE],
                [SignUpFormKeys.MOBILE]: formValues[SignUpFormKeys.MOBILE],
                [SignUpFormKeys.PASSWORD]: formValues[SignUpFormKeys.PASSWORD],
            },
        });

        if (response.isSuccessful) {
            const { data } = response;
            dispatch(loginSuccess(data.token));
            router.query = {};
            router.reload();
            toast({
                variant: ToastVariant.SUCCESS,
                message: "Login Successfull!",
            });
        } else {
            toast({
                variant: ToastVariant.ERROR,
                message: response.message,
            });
        }
    };

    const onSubmit = async () => {
        if (
            !(
                validateInput(SignUpFormKeys.PASSWORD) &&
                validateInput(SignUpFormKeys.CONFIRM_PASSWORD)
            )
        )
            return;

        const validationResult = getRequestBody();

        if (validationResult) {
            setLoading(true);
            const response = await apiClient.post<
                SignUpRequestType,
                SignUpResponseType
            >({
                url: SIGNUP_URL,
                body: validationResult,
            });

            if (response.isSuccessful) {
                toast({
                    variant: ToastVariant.SUCCESS,
                    message: "Account created",
                });
                loginProcedure();
            } else {
                toast({
                    variant: ToastVariant.ERROR,
                    message: response.message,
                });
                setLoading(false);
            }
        }
    };

    const handleFormInputValues = useCallback((e?: any, e2?: any) => {
        const rightEvent = e2 || e.target;
        const { name } = rightEvent;
        const { value } = rightEvent;

        if (!errorMessage[name])
            setErrorMessage((p: any) => ({
                ...p,
                [name]: undefined,
            }));

        setFormValues((p) => ({ ...p, [name]: value }));
    }, []);

    const onNext = () => {
        let flag = true;
        const keysToCheck = Object.keys(formValues).filter(
            (e) =>
                e !== SignUpFormKeys.CONFIRM_PASSWORD &&
                e !== SignUpFormKeys.PASSWORD
        );

        keysToCheck.forEach((e) => {
            flag = validateInput(e as SignUpFormKeys) && flag;
        });

        if (flag) sendOtpHelper();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => onClose(false)}
                isCloseButtonDark={false}
            >
                {page === 1 ? (
                    <SignupFirstPage
                        onSubmit={onNext}
                        handleFormInputValues={handleFormInputValues}
                        formValues={formValues}
                        errorMessages={errorMessage}
                    />
                ) : (
                    <SignupSecondPage
                        onSubmit={onSubmit}
                        handleFormInputValues={handleFormInputValues}
                        formValues={formValues}
                        isLoading={loading}
                        setPage={() => setPage(1)}
                        errorMessages={errorMessage}
                    />
                )}
            </Modal>
            <ToasterElement />
        </>
    );
};
