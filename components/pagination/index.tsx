import React from "react";
import {
    Pagination as SemanticPagination,
    PaginationProps,
} from "semantic-ui-react";

import styles from "./pagination.module.scss";

export const Pagination: React.FC<PaginationProps> = ({
    onChange,
    ...props
}) => {
    const onPageChange = (_: any, data: PaginationProps) => {
        onChange(data);
    };

    if (!props.totalPages) return <></>;

    return (
        <SemanticPagination
            className={styles.custom_pagination_class}
            onPageChange={onPageChange}
            {...props}
            firstItem={null}
            lastItem={null}
        />
    );
};
