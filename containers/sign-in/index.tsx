import React, { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Link from "next/link";

import EyeSlash from "../../assets/icon/eye-slash.svg";
import EyePass from "../../assets/icon/eyepass.svg";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { Text, ColorType, FontType } from "../../components/text";
import { Label } from "../../components/label";
import { Dropdown } from "../../components/dropdown";
import { SignUpGenericPage } from "../sign-up/signup-generic-page";

import styles from "./signin.module.scss";
import {
    SignInRequestType,
    SignInResponse,
    SignInFormKeys,
    SignInFormType,
    SignInPropsType,
} from "./types";
import {
    COUNTRY_CODES,
    MOBILE_PHONE_REGEX,
    PASSWORD_REGEX,
} from "../../utils/constants";
import { LOGIN_URL } from "../../api/url";
import { loginSuccess, setUserDetails } from "../../store/user";

import { useApi } from "../../hooks/useApi";
import { ToastVariant, useToast } from "../../hooks/useToast";
import { ROUTES } from "../../utils/routes";
import { getUser } from "../../api/helpers";

export const SignIn: React.FC<SignInPropsType> = ({ isOpen, onClose }: any) => {
    const [shownPass, setShownPass] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<SignInFormType>({
        [SignInFormKeys.COUNTRY_CODE]: "+91",
        [SignInFormKeys.MOBILE_NUMBER]: "",
        [SignInFormKeys.PASSWORD]: "",
    });
    const [errorMessage, setErrorMessage] = useState<any>({});

    const dispatch = useDispatch();
    const apiClient = useApi();
    const { toast, ToasterElement } = useToast();
    const router = useRouter();

    const BENEFITS_DATA = [
     'Unlimited search from more than 5000 plus properties',
	'Connect directly with brokers',
	'Unlimited bookmarks to save favourite properties',
	'Integrate leads from MagicBricks, 99acres and others to find matching properties'

    ]

    const handleFormInputValues = useCallback((e: any, e2: any) => {
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

    const checkInputValidation = (
        key: string,
        message: string,
        condition: boolean
    ) => {
        if (condition) {
            setErrorMessage((p: SignInFormType) => ({
                ...p,
                [key]: message,
            }));
            return false;
        }
        setErrorMessage((p: SignInFormType) => ({
            ...p,
            [key]: null,
        }));
        return true;
    };

    const validateForm = (): SignInRequestType | null => {
        const mobileNumber = formValues[SignInFormKeys.MOBILE_NUMBER];
        const password = formValues[SignInFormKeys.PASSWORD];
        const countryCode = formValues[SignInFormKeys.COUNTRY_CODE];

        let flag = checkInputValidation(
            SignInFormKeys.MOBILE_NUMBER,
            "Number should be of atleast 10 digits.",
            !MOBILE_PHONE_REGEX.test(mobileNumber)
        );

        flag =
            flag &&
            checkInputValidation(
                SignInFormKeys.COUNTRY_CODE,
                "Country code can't be empty",
                countryCode === ""
            );

        flag =
            flag &&
            checkInputValidation(
                SignInFormKeys.PASSWORD,
                "Passoword must contain atleast 8 characters",
                !PASSWORD_REGEX.test(password)
            );

        return flag ? { countryCode, mobileNumber, password } : null;
    };

    const onSubmit = async () => {
        const validationResult = validateForm();
        if (validationResult) {
            setLoading(true);
            const response = await apiClient.post<
                SignInRequestType,
                SignInResponse
            >({
                url: LOGIN_URL,
                body: validationResult,
            });

            if (response.isSuccessful) {
                const { data } = response;
                dispatch(loginSuccess(data.token));

                const res = await getUser();
                dispatch(setUserDetails(res.data));

                toast({
                    variant: ToastVariant.SUCCESS,
                    message: "Login Successfull!",
                });
                router.push("/home");
            } else {
                toast({
                    variant: ToastVariant.ERROR,
                    message: response.message,
                });
                setLoading(false);
            }
        }
    };

    const buttonDescription = (
        <div className="mt-16 mx-auto text-center">
            <Text font={FontType.SUBHEADING_S} weight={500}>
                New here?{" "}
                <Link href={ROUTES.auth.signup}>
                    <Text
                        className="cursor-pointer"
                        font={FontType.SUBHEADING_S}
                        type="span"
                        color={ColorType.PRIMARY}
                        weight={500}
                    >
                        Sign Up!
                    </Text>
                </Link>
            </Text>
        </div>
    );

    const closeModal = () => {
        onClose(false);
    };

    const countryCodes = useMemo(() => COUNTRY_CODES, []);
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                isCloseButtonDark={false}
            >
                <SignUpGenericPage
                    heading="Sign In"
                    signUpDesc="Already a Member? Enter your details for signing in"
                    buttonText="Sign In"
                    onSubmit={onSubmit}
                    buttonDesc={buttonDescription}
                    isLoading={isLoading}
                     BENEFITS_DATA={ BENEFITS_DATA}
                >
                    <div
                        className={cx(
                            styles.signin__container,
                            "flex flex-col gap-8 mt-4"
                        )}
                    >
                        <div
                            className={
                                styles.signin__container__mobile__container
                            }
                        >
                            <Label label="Mobile Number" />
                            <div
                                className={cx(
                                    styles.signin__container__mobile__container_input,
                                    "flex flex-1 gap-5"
                                )}
                                style={{ gap: 12 }}
                            >
                                <Dropdown
                                    name="country_code"
                                    wrapperClassName="flex-1"
                                    options={countryCodes}
                                    value={
                                        formValues[SignInFormKeys.COUNTRY_CODE]
                                    }
                                    search
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessage[
                                            SignInFormKeys.COUNTRY_CODE
                                        ]
                                    }
                                    disabled
                                />
                                <Input
                                    name={SignInFormKeys.MOBILE_NUMBER}
                                    wrapperClassName="flex-1"
                                    value={
                                        formValues[SignInFormKeys.MOBILE_NUMBER]
                                    }
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessage[
                                            SignInFormKeys.MOBILE_NUMBER
                                        ]
                                    }
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <Input
                                type={shownPass ? "text" : "password"}
                                name={SignInFormKeys.PASSWORD}
                                label="Password"
                                value={formValues[SignInFormKeys.PASSWORD]}
                                onChange={handleFormInputValues}
                                errorMessage={
                                    errorMessage[SignInFormKeys.PASSWORD]
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

                            {/* <Img
                                className="absolute right-3 bottom-5"
                                // name="eye slash"
                                // src={EyeSlash.src}
                                onClick={() => {
                                    setShownPass(!shownPass);
                                }}
                            /> */}
                        </div>

                        <Link href={ROUTES.general.reset}>
                            <Text
                                className="cursor-pointer ml-auto"
                                font={FontType.TITLE}
                                type="span"
                                color={ColorType.PRIMARY}
                                weight={400}
                            >
                                Forgot Password
                            </Text>
                        </Link>
                    </div>
                </SignUpGenericPage>
            </Modal>
            <ToasterElement />
        </>
    );
};
