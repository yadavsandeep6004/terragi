import React from "react";
import cx from "classnames";

import { Modal } from "../modal";
import { Button } from "../button";
import { Text, FontType, ColorType } from "../text";
import styles from "./logout.module.scss";

export type LogoutPropType = {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
    title: string;
    description: string;
};

const Logout: React.FC<LogoutPropType> = ({
    isOpen,
    onLogout,
    onClose,
    title,
    description,
}) => (
    <>
        <Modal
            className={cx(styles.modal)}
            isOpen={isOpen}
            onClose={onClose}
            isCloseButtonDark
        >
            <div className="mt-20 flex flex-col items-center">
                <Text font={FontType.HEADING_S} weight={500}>
                    {title}
                </Text>
                <Text className="mt-9" font={FontType.LABEL_L}>
                    {description}
                </Text>
                <div className="mt-12 ml-12 flex flex-row gap-16 items-center">
                    <Text
                        className="cursor-pointer"
                        font={FontType.TITLE}
                        type="span"
                        color={ColorType.PRIMARY}
                        weight={500}
                        onClick={onClose}
                    >
                        Cancel
                    </Text>

                    <Button type="button" onClick={onLogout}>
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    </>
);
export default Logout;
