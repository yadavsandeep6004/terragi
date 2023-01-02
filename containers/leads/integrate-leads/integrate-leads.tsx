import React, { useState } from "react";

import { Button, SizeType, VariantType } from "../../../components/button";
import { Input } from "../../../components/input";
import { ColorType, FontType, Text } from "../../../components/text";
import { IntegrateLeadKeys, IntegrateLeadType, LeadType } from "./types";
import { SelectorButton } from "../../../components/selector-button";
import { Modal } from "../../../components/modal";

import styles from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { getUserDetails, setUserDetails } from "../../../store/user";
import { getUser } from "../../../api/helpers";


const IntegrateLeadModalNonMemo: React.FC<IntegrateLeadType> = ({
    formValues,
    isOpen,
    onChange,
    onSubmit,
    onClose,
}) => {
    const user = useSelector(getUserDetails);
    const labelName = formValues[IntegrateLeadKeys.PLATFORM_TYPE];
    const dispatch = useDispatch();

    const connectLead = async () => {
        onSubmit(
            formValues[IntegrateLeadKeys.PLATFORM_TYPE],
            formValues[IntegrateLeadKeys.EMAIL],
            formValues[IntegrateLeadKeys.PASSWORD]
        );
        const responseUser = await getUser();
        dispatch(setUserDetails(responseUser.data));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCloseButtonDark
            className={styles.modal_layout}
        >
            <div className={styles.integratelead_frame}>
                <div>
                    <Text
                        className={styles.text_resize}
                        font={FontType.HEADING_M}
                        color={ColorType.COOL_BLACK}
                        weight={500}
                    >
                        Integrate Leads
                    </Text>

                    <Text
                        className={styles.text_connect_leads}
                        font={FontType.SUBHEADING_S}
                        color={ColorType.LABEL}
                        weight={500}
                    >
                        Connect leads from MagicBricks and 99acres portal
                    </Text>
                </div>
                <div>
                    <Text
                        className="mb-3"
                        font={FontType.SUBHEADING_S}
                        color={ColorType.LABEL}
                        weight={500}
                    >
                        Connect With
                    </Text>
                    <div>
                        <SelectorButton
                            name={IntegrateLeadKeys.PLATFORM_TYPE}
                            value={formValues[IntegrateLeadKeys.PLATFORM_TYPE]}
                            onChange={onChange}
                            options={[LeadType.MAGICBRICKS, LeadType.ACRES]}
                        />
                    </div>
                </div>

                {user?.externalCredentials ? (
                    labelName in user?.externalCredentials ? (
                        <Text className={styles.disconnectText}>
                            {labelName} Already Integrated , Please Disconnect
                        </Text>
                    ) : null
                ) : null}

                <Input
                    name={IntegrateLeadKeys.EMAIL}
                    value={formValues[IntegrateLeadKeys.EMAIL]}
                    label={`${labelName} User Id`}
                    onChange={onChange}
                />
                <Input
                    type="password"
                    name={IntegrateLeadKeys.PASSWORD}
                    value={formValues[IntegrateLeadKeys.PASSWORD]}
                    label={`${labelName} Password`}
                    onChange={onChange}
                />

                <div className="flex flex-row-reverse mt-2">
                    <Button
                        type="button"
                        size={SizeType.L}
                        onClick={connectLead}
                        disabled={
                             user?.externalCredentials
                                ? labelName in user?.externalCredentials
                                    ? true
                                    : false
                                : null
                        }
                    >
                        Connect
                    </Button>
                    <Button
                        className={styles.button_type}
                        type="button"
                        size={SizeType.L}
                        variant={VariantType.OUTLINED}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export const IntegrateLeadModal = React.memo(IntegrateLeadModalNonMemo);
