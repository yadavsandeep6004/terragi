import React, { useEffect, useState } from "react";

import { ColorType, FontType, Text } from "../text";

import styles from "./user.module.scss";

type UserIconProps = {
    name: string;
    profileImage?: string;
};

const UserIcon: React.FC<UserIconProps> = ({ name, profileImage }) => {
    const [initials, setInitials] = useState("");

    useEffect(() => {
        if (!name) return;

        const nameString = name.split(" ");
        const newInitials = (
            nameString[0][0] + (nameString[1]?.[0] || "")
        ).toUpperCase();

        setInitials(newInitials);
    }, [name]);

    return (
        <>
            {profileImage ? (
                <img
                    className={styles.profile_img}
                    src={profileImage}
                    alt="profile"
                />
            ) : (
                <div className={styles.wrapper}>
                    <Text
                        font={FontType.SUBHEADING_M}
                        color={ColorType.PRIMARY}
                        weight={600}
                    >
                        {initials}
                    </Text>
                </div>
            )}
        </>
    );
};

export const MemoUserIcon = React.memo(UserIcon);
