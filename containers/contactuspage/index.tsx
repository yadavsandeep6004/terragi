import { Modal } from "../../components/modal";
import {
    ContactUpPropsType,
    ContactUsFormKeys,
    ContactUsFormType,
    ContactUsRequestType,
} from "./types";

import React, { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { Input } from "../../components/input";
import { Text, FontType } from "../../components/text";
import { Label } from "../../components/label";
import { Dropdown } from "../../components/dropdown";

import styles from "./contactuspage.module.scss";

import { COUNTRY_CODES, MOBILE_PHONE_REGEX } from "../../utils/constants";
import { CONTACTS_US } from "../../api/url";

import { useApi } from "../../hooks/useApi";
import { Button } from "../../components/button";
import { ToastVariant, useToast } from "../../hooks/useToast";
import { loginSuccess } from "../../store/user";

export const ContactUsPage: React.FC<ContactUpPropsType> = ({
    isOpen,
    onClose,
}: any) => {
    const [formValues, setFormValues] = useState<ContactUsFormType>({
        [ContactUsFormKeys.COUNTRY_CODE]: "+91",
        [ContactUsFormKeys.MOBILE_NUMBER]: "",
        [ContactUsFormKeys.FULL_NAME]: "",
        [ContactUsFormKeys.MESSAGE]: "",
    });

    const [errorMessage, setErrorMessage] = useState<any>({});

    const dispatch = useDispatch();
    const apiClient = useApi();
    const { ToasterElement, toast } = useToast();
    const router = useRouter();

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
            setErrorMessage((p: ContactUsFormType) => ({
                ...p,
                [key]: message,
            }));
            return false;
        }
        setErrorMessage((p: ContactUsFormType) => ({
            ...p,
            [key]: null,
        }));
        return true;
    };

    const validateForm = (): ContactUsRequestType | null => {
        const mobileNumber = formValues[ContactUsFormKeys.MOBILE_NUMBER];
        const name = formValues[ContactUsFormKeys.FULL_NAME];
        const countryCode = formValues[ContactUsFormKeys.COUNTRY_CODE];
        const query = formValues[ContactUsFormKeys.MESSAGE];

        let flag = checkInputValidation(
            ContactUsFormKeys.MOBILE_NUMBER,
            "Number should be of atleast 10 digits.",
            !MOBILE_PHONE_REGEX.test(mobileNumber)
        );

        flag =
            flag &&
            checkInputValidation(
                ContactUsFormKeys.FULL_NAME,
                "FullName can't be empty",
                name === ""
            );

        return flag ? { countryCode, mobileNumber, name, query } : null;
    };

    const closeModal = () => {
        onClose(false);
    };

    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const openContactUsModal = () =>
        setIsContactUsModalOpen(!isContactUsModalOpen);

    const onSubmit = async () => {
        const validationResult = validateForm();
        if (validationResult) {
            const response = await apiClient.post({
                url: CONTACTS_US,
                body: validationResult,
            });

            if (response.isSuccessful) {
                toast({
                    variant: ToastVariant.SUCCESS,
                    message: response.message,
                });
                router.push("/home")
            } else {
                toast({
                    variant: ToastVariant.ERROR,
                    message: response.message,
                });
            }
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                isCloseButtonDark={false}
                className={styles.career}
            >
                <div
                    className={cx(
                        styles.signin__container,
                        "flex flex-col gap-8 mt-10"
                    )}
                >
                    <Text font={FontType.SUBHEADING_L}>
                        Leave your details and we'll get back to you.
                    </Text>
                    <div
                        className={styles.signin__container__mobile__container}
                    >
                        <Label label="Mobile Number *" />
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
                                options={COUNTRY_CODES}
                                value={
                                    formValues[ContactUsFormKeys.COUNTRY_CODE]
                                }
                                search
                                onChange={handleFormInputValues}
                                errorMessage={
                                    errorMessage[ContactUsFormKeys.COUNTRY_CODE]
                                }
                                disabled
                            />
                            <Input
                                name={ContactUsFormKeys.MOBILE_NUMBER}
                                wrapperClassName="flex-1"
                                value={
                                    formValues[ContactUsFormKeys.MOBILE_NUMBER]
                                }
                                onChange={handleFormInputValues}
                                errorMessage={
                                    errorMessage[
                                        ContactUsFormKeys.MOBILE_NUMBER
                                    ]
                                }
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <Input
                            name={ContactUsFormKeys.FULL_NAME}
                            label="FullName *"
                            value={formValues[ContactUsFormKeys.FULL_NAME]}
                            onChange={handleFormInputValues}
                            errorMessage={
                                errorMessage[ContactUsFormKeys.FULL_NAME]
                            }
                        />
                    </div>

                    <div className="relative">
                        <Input
                            name={ContactUsFormKeys.MESSAGE}
                            label="Message"
                            value={formValues[ContactUsFormKeys.MESSAGE]}
                            onChange={handleFormInputValues}
                            errorMessage={
                                errorMessage[ContactUsFormKeys.MESSAGE]
                            }
                        />
                    </div>

                    <div className="mt-8">
                        <Button
                            className={styles.sing_up_btn}
                            onClick={onSubmit}
                            type="button"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

