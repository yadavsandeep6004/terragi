/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { PropsWithChildren, ReactNode } from "react";
import { Modal as SemanticModal } from "semantic-ui-react";
import cx from "classnames";

import styles from "./modal.module.scss";

import CloseIcon from "../../assets/icon/close.svg";

const { Header, Content } = SemanticModal;

export type ModalProps = {
    header?: string | ReactNode;
    isOpen: boolean;
    onClose?: (isOpen: boolean) => void;
    closeOnOutsideClick?: boolean;
    isCloseButtonDark?: boolean;
    className?: string;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
    header,
    children,
    isOpen,
    onClose,
    closeOnOutsideClick = true,
    isCloseButtonDark = false,
    className,
}) => (
    <SemanticModal
        closeOnDimmerClick={closeOnOutsideClick}
        dimmer={{ className: styles.dimmer_container }}
        className={cx(styles.modal__container, className)}
        onClose={() => onClose?.(false)}
        onOpen={() => onClose?.(true)}
        open={isOpen}
        closeOnEscape={false}
        closeIcon={false}
    >
        {header && <Header>{header}</Header>}
        {children && <Content>{children}</Content>}
        <div
            className={styles.close_icon}
            data-isdark={isCloseButtonDark}
            onClick={() => onClose?.(false)}
        >
            <CloseIcon width="20" height="20" />
        </div>
    </SemanticModal>
);
