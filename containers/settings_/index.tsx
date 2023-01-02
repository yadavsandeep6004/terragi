import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import cx from "classnames";

import { useDispatch, useSelector } from "react-redux";

import { Dropdown } from "../../components/dropdown";

import { ColorType, FontType, Text } from "../../components/text";
import { Button, VariantType } from "../../components/button";
import { Input } from "../../components/input";
import {
    FormType,
    FormKeys,
    SettingRequestType,
    MemberRequestType,
} from "./types";

import styles from "./style.module.scss";
import { useApi } from "../../hooks/useApi";
import { getUserDetails, setUserDetails } from "../../store/user";
import { PLATEFORM_OPTIONS } from "./cosntants";
import {
    COUNTRY_CODES,
    EMAIL_CHECK_REGEX,
    MOBILE_PHONE_REGEX,
    PASSWORD_REGEX,
} from "../../utils/constants";
import { useToast, ToastVariant } from "../../hooks/useToast";
import EyeSlash from "../../assets/icon/eye-slash.svg";
import EyePass from "../../assets/icon/eyepass.svg";
import { DISCONNECT_PORTAL, GET_USER } from "../../api/url";
import { getUser } from "../../api/helpers";

const Settings: React.FC = () => {
    // const [isOtpSent, setIsOtpSent] = useState(false);
    const [shownPass, setShownPass] = useState(false);
    const [shownConfirmPass, setShownConfirmPass] = useState(false);
    const [shownMemberPass, setShownMemberPass] = useState(false);
    const { ToasterElement, toast } = useToast();
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState<FormType>({
        [FormKeys.EMAIL]: "",
        [FormKeys.FULL_NAME]: "",
        [FormKeys.MOBILE]: "",
        [FormKeys.COUNTRY_CODE]: "+91",
        [FormKeys.PASSWORD]: "",
        [FormKeys.CONFIRM_PASSWORD]: "",
        // [FormKeys.OTP]: "",
        [FormKeys.PLATFORM_OPTIONS]: "",
        [FormKeys.MEMBER_PASSWORD]: "",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage, setErrorMessage] = useState({});
    const checkInputValidation = (
        key: string,
        message: string,
        condition: boolean
    ) => {
        if (condition) {
            setErrorMessage((p) => ({
                ...p,
                [key]: message,
            }));
            return false;
        }
        setErrorMessage((p) => ({
            ...p,
            [key]: null,
        }));
        return true;
    };

    const validateInput = (key: FormKeys) => {
        const value = formValues[key];
        switch (key) {
            case FormKeys.MEMBER_PASSWORD:
            case FormKeys.PASSWORD:
                return checkInputValidation(
                    FormKeys.PASSWORD || FormKeys.MEMBER_PASSWORD,
                    "Passoword must contain atleast 8 characters",
                    !PASSWORD_REGEX.test(value)
                );
            case FormKeys.CONFIRM_PASSWORD:
                return checkInputValidation(
                    FormKeys.CONFIRM_PASSWORD,
                    "Passoword must contain atleast 8 characters",
                    formValues[FormKeys.PASSWORD] !== value
                );

            case FormKeys.FULL_NAME:
                return checkInputValidation(
                    FormKeys.FULL_NAME,
                    "Please enter your full name.",
                    value === ""
                );

            case FormKeys.PLATFORM_OPTIONS:
                return checkInputValidation(
                    FormKeys.PLATFORM_OPTIONS,
                    "Please select your Options",
                    value === ""
                );
            case FormKeys.COUNTRY_CODE:
                return checkInputValidation(
                    FormKeys.COUNTRY_CODE,
                    "Please select country code",
                    value === ""
                );
            case FormKeys.MOBILE:
                return checkInputValidation(
                    FormKeys.MOBILE,
                    "Please enter valid mobile number",
                    !MOBILE_PHONE_REGEX.test(value)
                );
            case FormKeys.EMAIL:
                return checkInputValidation(
                    FormKeys.EMAIL,
                    "Please enter valid email id",
                    !EMAIL_CHECK_REGEX.test(value)
                );
            default:
                return true;
        }
    };

    const handleFormInputValues = useCallback((e?: any, e2?: any) => {
        const rightEvent = e2 || e.target;
        const { name } = rightEvent;
        const { value } = rightEvent;
        setFormValues((p) => ({ ...p, [name]: value }));
    }, []);

    const user = useSelector(getUserDetails);

    const apiClient = useApi();

    const update = async () => {
        const response =
            formValues.platformType === "male"
                ? await apiClient.post({
                      url: DISCONNECT_PORTAL,
                      body: {
                          portal: "99Acres",
                      },
                  })
                : await apiClient.post({
                      url: DISCONNECT_PORTAL,
                      body: {
                          portal: "MagicBricks",
                      },
                  });
        if (response.isSuccessful) {
            toast({
                variant: ToastVariant.SUCCESS,
                message: response.message,
            });
            const responseUser = await getUser();
            dispatch(setUserDetails(responseUser.data));
        } else {
            toast({
                variant: ToastVariant.ERROR,
                message: response.message,
            });
        }
    };

    const countryCodes = useMemo(() => COUNTRY_CODES, []);
    const clientApi = useApi();
    const [isLoading, setLoading] = useState(false);

    // const getOtp = async () => {
    //     const response = await clientApi.post({
    //         url: "/auth/otp/send",
    //         body: {
    //             countryCode: user?.countryCode,
    //             mobileNumber: user?.mobileNumber,
    //         },
    //     });
    //     if (response.isSuccessful) {
    //         setIsOtpSent(true);
    //     }
    // };

    const getRequestBody = (): SettingRequestType | null => {
        const password = formValues[FormKeys.PASSWORD];
        // const otp = formValues[FormKeys.OTP];
        const mobileNumber = user?.mobileNumber;
        const countryCode = user?.countryCode;

        const finalBody: SettingRequestType = {
            password,
            // otp,
            mobileNumber,
            countryCode,
        };

        return finalBody;
    };

    const onSubmit = async () => {
        if (
            !(
                validateInput(FormKeys.PASSWORD) &&
                validateInput(FormKeys.CONFIRM_PASSWORD)
            )
        ) {
            return;
        }

        const validationResult = getRequestBody();

        if (validationResult) {
            setLoading(true);
            const response = await apiClient.post<SettingRequestType>({
                url: "auth/update/password",
                body: validationResult,
            });

            if (response.isSuccessful) {
                toast({
                    variant: ToastVariant.SUCCESS,
                    message: "Password Updated",
                });
                // setIsOtpSent(false);
                const obj = {
                    ...formValues,
                    [FormKeys.PASSWORD]: "",
                    [FormKeys.CONFIRM_PASSWORD]: "",
                };
                setFormValues(obj);
            } else {
                toast({
                    variant: ToastVariant.ERROR,
                    message: response.message,
                });
            }

            setLoading(false);
        }
    };

    const getMemberBody = (): MemberRequestType | null => {
        const fullName = formValues[FormKeys.FULL_NAME];
        const password = formValues[FormKeys.MEMBER_PASSWORD];
        const mobileNumber = formValues[FormKeys.MOBILE];
        const countryCode = user?.countryCode;
        const email = formValues[FormKeys.EMAIL];

        const finalBody: MemberRequestType = {
            fullName,
            password,
            mobileNumber,
            countryCode,
            email,
        };
        return finalBody;
    };

    const addTeamMember = async () => {
        if (
            !(validateInput(FormKeys.MEMBER_PASSWORD),
            validateInput(FormKeys.FULL_NAME),
            validateInput(FormKeys.MOBILE),
            validateInput(FormKeys.EMAIL),
            validateInput(FormKeys.COUNTRY_CODE))
        ) {
            return;
        }
        const validationResult = getMemberBody();

        if (validationResult) {
            setLoading(true);
            validationResult.password = formValues[FormKeys.MEMBER_PASSWORD];
            const response = await clientApi.post<MemberRequestType>({
                url: "/auth/teams",
                body: validationResult,
            });

            if (response.isSuccessful) {
                toast({
                    variant: ToastVariant.SUCCESS,
                    message: " Member added successfully",
                });

                const obj = {
                    ...formValues,
                    [FormKeys.MEMBER_PASSWORD]: "",
                    [FormKeys.FULL_NAME]: "",
                    [FormKeys.MOBILE]: "",
                    [FormKeys.EMAIL]: "",
                };
                setFormValues(obj);
            } else {
                toast({
                    variant: ToastVariant.ERROR,
                    message: response.message,
                });
            }

            setLoading(false);
        }
    };

    const getDisconnectOption = () => {
        const is99Acres = !!user?.externalCredentials?.["99Acres"];
        const isMagicBricks = !!user?.externalCredentials?.MagicBricks;
        const arr = [];
        if (is99Acres) {
            arr.push(PLATEFORM_OPTIONS[0]);
        }
        if (isMagicBricks) {
            arr.push(PLATEFORM_OPTIONS[1]);
        }
        return arr;
    };

    return (
        <>
            <div className={styles.basic_layout}>
                <Text
                    weight={500}
                    font={FontType.HEADING_M}
                    color={ColorType.COOL_BLACK}
                >
                    Settings
                </Text>
                <div className={styles.heading_frame}>
                    <Text weight={600} font={FontType.SUBHEADING_L}>
                        Update Password
                    </Text>
                    <div className={cx(styles.main_frame)}>
                        <div className="relative">
                            {" "}
                            <Input
                                wrapperClassName={styles.input_size}
                                className={cx(
                                    styles.input_size,
                                    styles.input_frame
                                )}
                                autoComplete="new-password"
                                label="New Password"
                                type={shownPass ? "text" : "password"}
                                required
                                placeholder="Enter new password"
                                name={FormKeys.PASSWORD}
                                value={formValues[FormKeys.PASSWORD]}
                                onChange={handleFormInputValues}
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
                                wrapperClassName={styles.input_size}
                                label="Confirm New Password*"
                                placeholder="Confirm new password"
                                type={shownConfirmPass ? "text" : "password"}
                                required
                                name={FormKeys.CONFIRM_PASSWORD}
                                value={formValues[FormKeys.CONFIRM_PASSWORD]}
                                onChange={handleFormInputValues}
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

                        <Button
                            className={cx(
                                styles.button_size,
                                "flex gap-x-14 md:ml-3"
                            )}
                            type="button"
                            variant={VariantType.OUTLINED}
                            onClick={onSubmit}
                            loading={isLoading}
                            // disabled={isOtpSent}
                        >
                            Update
                        </Button>
                    </div>
                    {/* {isOtpSent && (
                        <div className="w-full mt-10   ">
                            <Label label="OTP" required />
                            <div
                                className={cx(
                                    styles.otp_frame,
                                    "grid grid-col-2 gap-x-7"
                                )}
                            >
                                <OtpInput
                                    value={formValues[FormKeys.OTP] as string}
                                    numInputs={6}
                                    isInputNum
                                    containerStyle={styles.otp_box}
                                    // onChange={(e) => {
                                    //     console.log(e, "hello");
                                    //     setOtp(e);
                                    // }}
                                    onChange={(e: any) => {
                                        const event = {
                                            name: FormKeys.OTP,
                                            value: e.toString(),
                                        };
                                        handleFormInputValues(undefined, event);
                                        console.log(event, "event log");
                                        console.log(e, "e log");
                                    }}
                                />
                                <Button
                                    className={styles.button_size}
                                    type="button"
                                    variant="solid"
                                    onClick={onSubmit}
                                    loading={loading}
                                >
                                    Verify
                                </Button>
                            </div>
                        </div>
                    )} */}
                </div>
                <div className={styles.heading_frame}>
                    {/* <Text weight={600} font={FontType.SUBHEADING_L}>
                        Add Team Member
                    </Text>
                    <div className={cx(styles.main_frame)}>
                        <Input
                            wrapperClassName={styles.input_size}
                            className={styles.input_size}
                            label="Name"
                            placeholder="Enter full name"
                            required
                            name={FormKeys.FULL_NAME}
                            value={formValues[FormKeys.FULL_NAME]}
                            onChange={handleFormInputValues}
                        />
                        <Input
                            wrapperClassName={styles.input_size}
                            className={styles.input_size}
                            label="Email Id"
                            type="mobile"
                            placeholder="Enter email id"
                            name={FormKeys.EMAIL}
                            value={formValues[FormKeys.EMAIL]}
                            onChange={handleFormInputValues}
                        />
                        <div className="hidden md:block" />

                        <div className="flex gap-3 items-end w-full">
                            <Dropdown
                                name={FormKeys.COUNTRY_CODE}
                                // wrapperClassName={styles.ccode_input}
                                search
                                label="Mobile Number"
                                labelClassName="whitespace-nowrap"
                                // className={styles.ccode_input}
                                options={countryCodes}
                                value={formValues[FormKeys.COUNTRY_CODE]}
                                onChange={handleFormInputValues}
                                required
                                disabled
                            />
                            <Input
                                wrapperClassName={styles.mobileinput_size}
                                placeholder="Enter mobile number"
                                type="number"
                                className={styles.mobileinput_size}
                                // className="self-end"
                                name={FormKeys.MOBILE}
                                value={formValues[FormKeys.MOBILE]}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    const { value } = e.target;
                                    if (value.length <= 10) {
                                        handleFormInputValues(e);
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                wrapperClassName={styles.input_size}
                                className={cx(
                                    styles.input_size,
                                    styles.input_frame
                                )}
                                label=" Password"
                                type={shownMemberPass ? "text" : "password"}
                                font={FontType.TITLE}
                                required
                                placeholder="Enter  password"
                                name={FormKeys.MEMBER_PASSWORD}
                                value={formValues[FormKeys.MEMBER_PASSWORD]}
                                onChange={handleFormInputValues}
                            />
                            {shownMemberPass ? (
                                <EyePass
                                    height={20}
                                    width={20}
                                    className="absolute right-3 bottom-5"
                                    onClick={() => {
                                        setShownMemberPass(!shownMemberPass);
                                    }}
                                />
                            ) : (
                                <EyeSlash
                                    height={20}
                                    width={20}
                                    className="absolute right-3 bottom-5"
                                    onClick={() => {
                                        setShownMemberPass(!shownMemberPass);
                                    }}
                                />
                            )}
                        </div>

                        <Button
                            className={styles.button_size}
                            type="button"
                            variant={VariantType.OUTLINED}
                            onClick={addTeamMember}
                            loading={isLoading}
                        >
                            Add Member
                        </Button>
                    </div>

                    <div className={cx(styles.mobile_label_frame)}>
                        <div />
                    </div> */}
                    {user?.userType === "broker" ? (
                        <div className="mt-11">
                            <Text weight={600} font={FontType.SUBHEADING_L}>
                                Stop/Pause Lead Integration
                            </Text>
                            <div className={cx(styles.main_frame)}>
                                <Dropdown
                                    name={FormKeys.PLATFORM_OPTIONS}
                                    label="Portal"
                                    wrapperClassName={styles.input_size}
                                    onChange={handleFormInputValues}
                                    value={
                                        formValues[FormKeys.PLATFORM_OPTIONS]
                                    }
                                    options={getDisconnectOption()}
                                    required
                                    placeholder={
                                        getDisconnectOption().length === 0
                                            ? "No Portals Connected, Kindly Connect First"
                                            : "Select Disconnect from"
                                    }
                                    disabled={
                                        user.planId === "-1" ||
                                        getDisconnectOption().length === 0
                                    }
                                />
                                <div className={styles.empty_divs} />
                                <Button
                                    className={cx(
                                        styles.button_size,
                                        "place-content-end"
                                    )}
                                    type="button"
                                    variant={VariantType.OUTLINED}
                                    onClick={update}
                                    disabled={
                                        user.planId === "-1" ||
                                        getDisconnectOption().length === 0
                                    }
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <ToasterElement />
        </>
    );
};

export default Settings;
