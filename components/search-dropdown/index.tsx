import cx from "classnames";

import { convertConfigDataToSemanticLanguage } from "../../utils/helpers";
import { SearchConfigType } from "../../utils/types";
import { Dropdown, DropdownLabel } from "../dropdown";

import styles from "./search-drop.module.scss";

type SearchDropDownProps = {
    name: string;
    className?: string;
    label?: string;
    required?: boolean;
    searchResults: SearchConfigType[];
    onChange: Function;
    onSelect: Function;
    defaultValue: string[] | number[];
};

export const SearchDropDown: React.FC<SearchDropDownProps> = ({
    name,
    className = "",
    label = "",
    required = false,
    onChange,
    searchResults,
    onSelect,
    defaultValue,
}) => {
    const normalizedOptions =
        convertConfigDataToSemanticLanguage(searchResults);

    return (
        <>
            <Dropdown
                name={name}
                wrapperClassName={cx(className, styles.modal_dropdown_wrapper)}
                className={styles.modal_dropdown}
                defaultValue={defaultValue || []}
                renderLabel={DropdownLabel}
                label={label}
                required={required}
                onSearchChange={onChange}
                onChange={onSelect}
                options={normalizedOptions}
                search
                multiple
                selection
            />
        </>
    );
};
