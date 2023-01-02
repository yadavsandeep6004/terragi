import React, { useEffect, useMemo, useRef } from "react";
import cx from "classnames";
import { DropdownProps } from "semantic-ui-react";

import { formatMoneyToInr } from "../../utils/helpers";
import { Label } from "../label";
import { Range } from "../range";

import styles from "./budget.module.scss";
import { Dropdown } from "../dropdown";

type BudgetInputProps = {
    required: boolean;
    onChange: (e: any, data: any) => void;
    name: string;
    label?: string;
    globalValue?: any;
};

export const BudgetInput: React.FC<BudgetInputProps> = ({
    required,
    name,
    label,
    onChange: onGlobalStateChange,
    globalValue,
}) => {
    const value = useRef<any>([
        globalValue[0] || 0,
        globalValue[1] || 1000000000,
    ]);
    const minRef = useRef<any>();
    const maxRef = useRef<any>();

    const onChange = (e: any) => {
        value.current = e.target.value;

        if (minRef.current && maxRef.current) {
            minRef.current.innerText = formatMoneyToInr(e.target.value[0]);
            maxRef.current.innerText = formatMoneyToInr(e.target.value[1]);
        }
    };

    const changeGlobalState = () => {
        const finalValue = {
            name,
            value: value.current,
        };
        onGlobalStateChange(finalValue, finalValue);
    };

    const dropdownHandler = (_: any, data: DropdownProps) => {
        if (data.name === "minValue") {
            const finalValue = {
                name,
                value: [data.value, value.current[1]],
            };
            value.current = finalValue.value;
            onGlobalStateChange(finalValue, finalValue);
        } else {
            const finalValue = {
                name,
                value: [value.current[0], data.value],
            };
            value.current = finalValue.value;
            onGlobalStateChange(finalValue, finalValue);
        }
    };

    useEffect(() => {
        const element = document.querySelector("[name='minValue'] div");
        const element2 = document.querySelector("[name='maxValue'] div");

        minRef.current = element;
        maxRef.current = element2;

        onChange({ target: { name: "minValue", value: value.current } });
        onChange({ target: { name: "maxValue", value: value.current } });
    }, []);

    const values = useMemo(
        () =>
            [
                { key: "0", value: "0", text: "0" },
                { key: "5000000", value: "5000000", text: "5000000" },
                { key: "10000000", value: "10000000", text: "10000000" },
                { key: "15000000", value: "15000000", text: "15000000" },
                { key: "20000000", value: "20000000", text: "20000000" },
                { key: "25000000", value: "25000000", text: "25000000" },
                { key: "30000000", value: "30000000", text: "30000000" },
                { key: "35000000", value: "35000000", text: "35000000" },
                { key: "40000000", value: "40000000", text: "40000000" },
                { key: "45000000", value: "45000000", text: "45000000" },
                { key: "50000000", value: "50000000", text: "50000000" },
                { key: "55000000", value: "55000000", text: "55000000" },
                { key: "60000000", value: "60000000", text: "60000000" },
                { key: "65000000", value: "65000000", text: "65000000" },
                { key: "70000000", value: "70000000", text: "70000000" },
                { key: "75000000", value: "75000000", text: "75000000" },
                { key: "80000000", value: "80000000", text: "80000000" },
                { key: "100000000", value: "100000000", text: "100000000" },
                { key: "150000000", value: "150000000", text: "150000000" },
                { key: "200000000", value: "200000000", text: "200000000" },
                { key: "250000000", value: "250000000", text: "250000000" },
            ].map((e) => ({ ...e, text: formatMoneyToInr(+e.text) })),
        []
    );

    let minDropV = value.current[0];
    let maxDropV = value.current[1];
    for (let i = 0; i < values.length; i += 1) {
        const currV = +values[i].value;

        if (+value.current[0] > currV) minDropV = currV;
        if (+value.current[1] > currV) maxDropV = currV;
    }

    return (
        <div className="flex flex-col">
            {label && <Label label={label} required={required} />}
            <div
                className={cx(
                    "flex justify-between mb-8",
                    styles.range_input_wrapper
                )}
            >
                <Dropdown
                    name="minValue"
                    wrapperClassName="flex-1"
                    options={values}
                    onChange={dropdownHandler}
                    value={`${minDropV}`}
                />
                <Dropdown
                    name="maxValue"
                    wrapperClassName="flex-1"
                    onChange={dropdownHandler}
                    options={values}
                    value={`${maxDropV}`}
                />
            </div>
            <Range
                name={name}
                domain={[0, 250000000]}
                values={value.current}
                setUpdate={onChange}
                onSlideEnd={changeGlobalState}
                format={formatMoneyToInr}
            />
        </div>
    );
};
