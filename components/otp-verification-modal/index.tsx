import React, { useState } from "react";
import OtpInput from "react-otp-input";
import cx from "classnames";

import { Button } from "../button";
import { Label } from "../label";
import { Modal } from "../modal";
import { FontType, Text } from "../text";

import styles from "./verification.module.scss";

export type OtpVerificationModalProps = {
    isOpen: boolean;
    onClose: (flag: boolean) => void;
    onSubmit: (otp: string) => void;
};

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
    isOpen = true,
    onClose,
    onSubmit,
}) => {
    const [otp, setOtp] = useState("");

    return (
        <Modal
            className={cx("p-4 md:p-12", styles.verification_modal)}
            isOpen={isOpen}
            onClose={onClose}
            isCloseButtonDark
            closeOnOutsideClick
        >
            <Text font={FontType.HEADING_L} weight={600}>
                Verify OTP
            </Text>
            <div className="my-12">
                <Label label="OTP" required />
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    containerStyle={styles.childOtp}
                    isInputNum
                />
            </div>

            <Button
                onClick={() => onSubmit(otp)}
                className={styles.verification_btn}
                fluid
                type="submit"
                disabled={otp.length !== 4}
            >
                Verify
            </Button>
        </Modal>
    );
};
