import React, { useState } from "react";
import cx from "classnames";
import { DropdownProps } from "semantic-ui-react";

import { Dropdown } from "../../../components/dropdown";
import { ColorType, FontType, Text } from "../../../components/text";

import DropdownIcon from "../../../assets/icon/dropdown.svg";
import styles from "./sortby.module.scss";
import { OptionType } from "../../settings /types";

type SortByPropsType = {
    onChange: Function;
    options?: OptionType[];
    defaultValue?: string;
};

export const SortBy: React.FC<SortByPropsType> = ({
    onChange,
    options,
    defaultValue,
}) => {
    const [value, setValue] = useState(defaultValue || "Newest");
    return (
        <div className={cx("flex items-center", styles.wrapper)}>
            <Dropdown
                text={
                    <Text
                        font={FontType.LABEL_M}
                        color={ColorType.GREY500}
                        type="p"
                    >
                        Sort By:
                        <Text
                            font={FontType.LABEL_M}
                            color={ColorType.GREY500}
                            type="span"
                        >
                            {` ${value}`}
                        </Text>
                        <DropdownIcon
                            className="inline-block align-baseline"
                            width="12px"
                            height="8px"
                        />
                    </Text>
                }
                value={value}
                onChange={(_: any, data: DropdownProps) => {
                    const string = (data.value as string).split("-");
                    const order =
                        string[0] === "newest" || string[0] === "high" ? -1 : 1;
                    onChange(order, string[1] || data);
                    setValue(
                        data.options?.find((e) => e.value === data.value)
                            ?.text as string
                    );
                }}
                className={styles.sort__dropdown}
                icon={null}
                options={
                    options || [
                        { key: 1, value: "newest-_id", text: "Newest" },
                        { key: 2, value: "oldest-_id", text: "Oldest" },
                    ]
                }
            />
        </div>
    );
};
