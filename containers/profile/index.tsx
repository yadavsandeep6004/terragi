import React, { useCallback, useEffect, useMemo, useState } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { Button, SizeType } from "../../components/button";
import { Dropdown } from "../../components/dropdown";
import { Input } from "../../components/input";
import { ColorType, FontType, Text } from "../../components/text";
import { MemoUserIcon } from "../../components/user-icon";
import { getUserDetails, setUserDetails } from "../../store/user";
import {
    COUNTRY_CODES,
    EMAIL_CHECK_REGEX,
    MOBILE_PHONE_REGEX,
} from "../../utils/constants";
import { EXPERIENCE_OPTIONS, GENDER_OPTIONS } from "../sign-up/constants";
import {
    ProfileFormKeys,
    ProfileFormType,
    ProfileGetRequestType,
    ProfileImageKey,
    ProfileResponseType,
} from "./types";
import { ToastVariant, useToast } from "../../hooks/useToast";
import { useApi } from "../../hooks/useApi";
import { PROFILE, SEND_OTP, UPLOAD_IMAGE } from "../../api/url";
import { convertDate, getReliableDateFormat } from "../../utils/helpers";

import styles from "./profile.module.scss";
import { getUser } from "../../api/helpers";
import { Label } from "../../components/label";
import { OtpVerificationModal } from "../../components/otp-verification-modal";
import { DobInput } from "../../components/dob-input";

const ProfileContainer = () => {
    const [formValues, setFormValues] = useState<ProfileFormType>({
        [ProfileFormKeys.ADDRESS]: "",
        [ProfileFormKeys.ALTERNATE_NUMBER]: "",
        [ProfileFormKeys.COUNTRY_CODE]: "+91",
        [ProfileFormKeys.DOB]: "1991-April-12",
        [ProfileFormKeys.EMAIL]: "",
        [ProfileFormKeys.EXPERIENCE]: "",
        [ProfileFormKeys.GENDER]: "",
        [ProfileFormKeys.MOBILE]: "",
        [ProfileFormKeys.PROFILE_IMAGE]: "",
    });
    const [errorMessages, setErrorMessage] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [images, setImage] = useState("");
    const [isDirty, setIsDirty] = useState(false);
    const [isOtpModalOpen, setOtpModalOpen] = useState(false);

    const user = useSelector(getUserDetails);
    const { ToasterElement, toast } = useToast();
    const apiClient = useApi();
    const dispatch = useDispatch();
    const countryCodes = useMemo(() => COUNTRY_CODES, []);
    // eslint-disable-next-line no-console
    useEffect(() => {
        if (user) {
            setFormValues({
                [ProfileFormKeys.ADDRESS]: user.officeAddress,
                [ProfileFormKeys.ALTERNATE_NUMBER]: user.alternateNumber,
                [ProfileFormKeys.COUNTRY_CODE]: user.countryCode,
                [ProfileFormKeys.DOB]: convertDate(user.dob),
                [ProfileFormKeys.EMAIL]: user.email,
                [ProfileFormKeys.EXPERIENCE]: `${user.experience}`,
                [ProfileFormKeys.GENDER]: user.gender,
                [ProfileFormKeys.MOBILE]: user.mobileNumber,
                [ProfileFormKeys.PROFILE_IMAGE]: user.profileImage,
            });
            setImage(user.profileImage);
        }
    }, []);

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

    const validateInput = (key: ProfileFormKeys) => {
        const value = formValues[key];
        switch (key) {
            case ProfileFormKeys.EMAIL:
                return checkInputValidation(
                    ProfileFormKeys.EMAIL,
                    "Please enter valid email.",
                    value !== "" && !EMAIL_CHECK_REGEX?.test(value)
                );
            case ProfileFormKeys.DOB:
                return checkInputValidation(
                    ProfileFormKeys.DOB,
                    "Please enter date of birth.",
                    value === ""
                );
            case ProfileFormKeys.EXPERIENCE:
                return checkInputValidation(
                    ProfileFormKeys.EXPERIENCE,
                    "Please enter experience level.",
                    value === ""
                );
            case ProfileFormKeys.GENDER:
                return checkInputValidation(
                    ProfileFormKeys.GENDER,
                    "Please select your gender",
                    value === ""
                );
            case ProfileFormKeys.COUNTRY_CODE:
                return checkInputValidation(
                    ProfileFormKeys.COUNTRY_CODE,
                    "Please select country code",
                    value === ""
                );
            case ProfileFormKeys.ALTERNATE_NUMBER: {
                return formValues.mobileNumber != formValues.alternateNumber
                    ? checkInputValidation(
                          key,
                          "Please enter valid mobile number",
                          value !== "" && !MOBILE_PHONE_REGEX.test(value)
                      )
                    : checkInputValidation(
                          key,
                          "Primary number and Alternate number can't be same",
                          true
                      );
            }

            case ProfileFormKeys.MOBILE:
                return checkInputValidation(
                    key,
                    "Please enter valid mobile number",
                    !MOBILE_PHONE_REGEX.test(value)
                );

            case ProfileFormKeys.ADDRESS:
                return checkInputValidation(
                    ProfileFormKeys.ADDRESS,
                    "Please enter date of birth.",
                    value === ""
                );
            default:
                return true;
        }
    };

    const validateForm = (): boolean => {
        let flag = true;
        const keysToCheck = Object.keys(formValues);
        keysToCheck.forEach((e) => {
            flag = validateInput(e as ProfileFormKeys) && flag;
        });

        return flag;
    };

    const getRequestBody = (): ProfileGetRequestType | null => {
        const mobileNumber = formValues[ProfileFormKeys.MOBILE];
        const email = formValues[ProfileFormKeys.EMAIL];
        const dob = formValues[ProfileFormKeys.DOB];
        const countryCode = formValues[ProfileFormKeys.COUNTRY_CODE];
        const gender = formValues[ProfileFormKeys.GENDER];
        const experience = formValues[ProfileFormKeys.EXPERIENCE];
        const officeAddress = formValues[ProfileFormKeys.ADDRESS];

        return {
            countryCode,
            mobileNumber,
            gender,
            officeAddress,
            email,
            dob: getReliableDateFormat(dob),
            experience: +experience,
            profileImage: images,
        };
    };

    const onSubmit = async (otp?: string) => {
        const body = getRequestBody();

        if (body) {
            setLoading(true);
            const response = await apiClient.update<
                ProfileGetRequestType,
                ProfileResponseType
            >({
                url: PROFILE,
                body: {
                    ...body,
                    ...(typeof (formValues.alternateNumber as any) === "string"
                        ? {
                              alternateNumber: {
                                  mobileNumber: formValues.alternateNumber,
                                  countryCode: "+91",
                                  otp,
                              },
                          }
                        : {}),
                },
            });

            if (response.isSuccessful) {
                toast({
                    variant: ToastVariant.SUCCESS,
                    message: "Profile updated successfully",
                });
                const responseUser = await getUser();
                dispatch(setUserDetails(responseUser.data));
                setIsDirty(false);
            } else {
                toast({
                    variant: ToastVariant.ERROR,
                    message: response.message,
                });
            }

            setOtpModalOpen(false);
            setLoading(false);
        }
    };

    const handleFormInputValues = useCallback((e?: any, e2?: any) => {
        setIsDirty(true);
        const rightEvent = e2 || e.target;
        const { name } = rightEvent;
        const { value } = rightEvent;

        if (!errorMessages[name])
            setErrorMessage((p: any) => ({
                ...p,
                [name]: undefined,
            }));
        setFormValues((p) => ({ ...p, [name]: value }));
    }, []);

    const onImageChange = async (e: any) => {
        setIsDirty(true);

        const formData = new FormData();
        formData.append("profileImage", e.target.files[0]);

        const response = await apiClient.post({
            url: UPLOAD_IMAGE,
            body: formData,
        });

        setImage(response.data.profileImage);
    };

    return (
        <div className="md:p-10 p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const validationResult = validateForm();
                    if (!validationResult) return;

                    // if (
                    //     formValues.alternateNumber &&
                    //     user?.alternateNumber !== formValues.alternateNumber
                    // ) {
                    //     apiClient.post({
                    //         url: SEND_OTP,
                    //         body: {
                    //             mobileNumber: formValues.alternateNumber,
                    //             countryCode: "+91",
                    //         },
                    //     });
                    //     setOtpModalOpen(true);
                    //     return;
                    // }
                    onSubmit(undefined);
                }}
            >
                <Text
                    weight={500}
                    font={FontType.HEADING_M}
                    color={ColorType.COOL_BLACK}
                >
                    Profile
                </Text>
                <Text
                    className="py-4"
                    font={FontType.SUBHEADING_L}
                    weight={600}
                    color={ColorType.HEADING_SECONDARY}
                >
                    {user?.fullName}
                </Text>
                <div className="flex items-center">
                    <MemoUserIcon
                        name={user?.fullName || "A"}
                        profileImage={images || user?.profileImage}
                    />

                    <div className={styles.upload_photo_wrapper}>
                        <Text
                            type="label"
                            htmlFor="profile_photo"
                            className={styles.upload_photo_btn}
                        >
                            Upload a Photo
                        </Text>

                        <input
                            id="profile_photo"
                            name={ProfileImageKey.PROFILE_IMAGE}
                            type="file"
                            onChange={onImageChange}
                        />
                    </div>
                </div>

                <div
                    className={cx(
                        styles.profile_form_wrapper,
                        "flex flex-col mt-6"
                    )}
                >
                    <div className="flex flex-col md:flex-row flex-wrap  md:mb-8 mb-4  md:gap-8 gap-4">
                        <div className="flex-1">
                            <Label label="Mobile Number" required />
                            <div className="flex flex-1" style={{ gap: 12 }}>
                                <Dropdown
                                    name={ProfileFormKeys.COUNTRY_CODE}
                                    wrapperClassName={
                                        styles.country_code_wrapper
                                    }
                                    search
                                    options={countryCodes}
                                    required
                                    value="+91"
                                    disabled
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessages[
                                            ProfileFormKeys.COUNTRY_CODE
                                        ]
                                    }
                                />

                                <Input
                                    type="tel"
                                    name={ProfileFormKeys.MOBILE}
                                    wrapperClassName="flex-1"
                                    required
                                    disabled
                                    value={formValues[ProfileFormKeys.MOBILE]}
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessages[ProfileFormKeys.MOBILE]
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <Label label="Alternate Mobile Number" />
                            <div className="flex flex-1" style={{ gap: 12 }}>
                                <Dropdown
                                    name={ProfileFormKeys.COUNTRY_CODE}
                                    wrapperClassName={
                                        styles.country_code_wrapper
                                    }
                                    search
                                    options={countryCodes}
                                    required
                                    value="+91"
                                    disabled
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessages[
                                            ProfileFormKeys.COUNTRY_CODE
                                        ]
                                    }
                                />

                                <Input
                                    type="tel"
                                    name={ProfileFormKeys.ALTERNATE_NUMBER}
                                    wrapperClassName="flex-1"
                                    value={
                                        formValues[
                                            ProfileFormKeys.ALTERNATE_NUMBER
                                        ]
                                    }
                                    onChange={handleFormInputValues}
                                    errorMessage={
                                        errorMessages[
                                            ProfileFormKeys.ALTERNATE_NUMBER
                                        ]
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-8 gap-4 md:mb-8 mb-4 flex-wrap">
                        <Dropdown
                            name={ProfileFormKeys.GENDER}
                            label="Gender"
                            wrapperClassName="flex-1"
                            options={GENDER_OPTIONS}
                            required
                            value={formValues[ProfileFormKeys.GENDER]}
                            onChange={handleFormInputValues}
                            errorMessage={errorMessages[ProfileFormKeys.GENDER]}
                        />
                        <DobInput
                            name={ProfileFormKeys.DOB}
                            label="Date of Birth"
                            value={formValues[ProfileFormKeys.DOB]}
                            required
                            onChange={(e: any) => {
                                handleFormInputValues(undefined, e);
                            }}
                            errorMessage={errorMessages[ProfileFormKeys.DOB]}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-8 gap-4 md:mb-8 mb-4 flex-wrap">
                        <Dropdown
                            name={ProfileFormKeys.EXPERIENCE}
                            wrapperClassName="flex-1"
                            label="Since how long you are in Business"
                            options={EXPERIENCE_OPTIONS}
                            required
                            value={+formValues[ProfileFormKeys.EXPERIENCE]}
                            onChange={handleFormInputValues}
                            errorMessage={
                                errorMessages[ProfileFormKeys.EXPERIENCE]
                            }
                        />
                        <Input
                            name={ProfileFormKeys.EMAIL}
                            wrapperClassName="flex-1"
                            label="Email Id"
                            required
                            value={formValues[ProfileFormKeys.EMAIL]}
                            onChange={handleFormInputValues}
                            errorMessage={errorMessages[ProfileFormKeys.EMAIL]}
                        />
                    </div>

                    {/* change after textarea component merge */}
                    <Input
                        name={ProfileFormKeys.ADDRESS}
                        label="Office Address"
                        required
                        value={formValues[ProfileFormKeys.ADDRESS]}
                        onChange={handleFormInputValues}
                        errorMessage={errorMessages[ProfileFormKeys.ADDRESS]}
                    />

                    <Button
                        className={styles.save_btn}
                        size={SizeType.L}
                        type="submit"
                        loading={loading}
                        disabled={!isDirty}
                    >
                        Save
                    </Button>
                </div>
            </form>
            <ToasterElement />
            <OtpVerificationModal
                isOpen={isOtpModalOpen}
                onClose={() => setOtpModalOpen(false)}
                onSubmit={(otp) => {
                    onSubmit(otp);
                }}
            />
        </div>
    );
};

export default ProfileContainer;
