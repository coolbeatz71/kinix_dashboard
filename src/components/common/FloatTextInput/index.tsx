/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { cloneElement, FC, ReactElement, useRef, useState } from 'react';
import styles from './index.module.scss';

interface IFloatTextInputProps {
    label: string;
    id?: string;
    value?: any;
    datePicker?: boolean;
    select?: boolean;
    formatNumber?: boolean;
    onChange?: () => void;
    loading?: boolean;
    required?: boolean;
    placeholder?: string;
    children: ReactElement;
}

const FloatTextInput: FC<IFloatTextInputProps> = ({
    label,
    id = 'FloatTextInput',
    value = '',
    datePicker = false,
    select = false,
    formatNumber = false,
    onChange = () => null,
    loading = false,
    required = false,
    children,
    placeholder = '',
}) => {
    if (!placeholder) placeholder = label;
    const [focus, setFocus] = useState<boolean>(false);

    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [selectOpen, setSelectOpen] = useState<boolean>(false);

    const hasValue = focus || (value && value.length !== 0) || value == '0';
    const labelClassName = hasValue ? `label asLabel` : `label asPlaceholder`;
    const requiredMark = required && <span className="text-danger">*</span>;

    const ref = useRef({
        click: (): any => null,
        focus: (): any => null,
    });

    const datePickerProps = {
        open: datePickerOpen,
        onOpenChange: (o: boolean) => {
            setDatePickerOpen(o);
        },
    };

    const selectProps = {
        open: selectOpen,
        onDropdownVisibleChange: (o: boolean) => {
            setSelectOpen(o);
        },
    };

    const numberProps = {
        formatter: (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value: any) => value.replace(/\$\s?|(,*)/g, ''),
    };

    return (
        <div className={styles.textInput} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
            {cloneElement(children, {
                ref,
                value,
                onChange,
                ...(select ? selectProps : {}),
                ...(formatNumber ? numberProps : {}),
                ...(datePicker ? datePickerProps : {}),
                ...(loading ? { disabled: true } : {}),
            })}
            <label
                htmlFor={id}
                key={`label-for-${id}`}
                className={labelClassName}
                onClick={() => {
                    ref.current.focus();
                    if (datePicker) setDatePickerOpen(!datePickerOpen);
                    if (select) setSelectOpen(!selectOpen);
                }}
            >
                {hasValue ? label : placeholder} {requiredMark}
            </label>
        </div>
    );
};

export default FloatTextInput;
