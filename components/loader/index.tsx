import React from "react";
import { Loader as SemanticLoader } from "semantic-ui-react";

import styles from "./loader.module.scss";

export const Loader = () => (
    <SemanticLoader className={styles.loader_wrapper} active />
);
