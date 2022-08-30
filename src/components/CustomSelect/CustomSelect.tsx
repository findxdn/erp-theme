import { Tooltip } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import MessageError from '../../utils/MessageError';
import styles from "./Select.module.scss"

export interface CustomSelectProps {
    name: string;
    className?: string;
    placeholder?: any;
    onChange?: any;
    options?: any;
    register?: any;
    errors?: any;
    styles?: any;
    defaultValue?: any;
    _props?: any;
    ref?: any;
    value?: any;
    isTooltip?: any;
    disabled?: any;
    inputRef?: any;
    isSearchOpitons?: any;
    onChangeInput?: any;
    noOptionsText?: any;
    isClearable?: any;
    isMulti?: any;
    escapeClearsValue?: any;
    noOptionsMessage?: any;
    isSearchable?: any;
  }
const CustomSelect = React.forwardRef((props: CustomSelectProps, ref) => {
    const {
        escapeClearsValue = true,
        placeholder = "Chọn",
        isSearchable = true,
        noOptionsMessage = () => "Không tìm thấy",
        errors = [],
        isTooltip = false,
        name = 'custom-select-name',
        disabled = false,
        value,
        options = [],
        isClearable = true,
        isMulti = false,
    } = props
    const onChange = (val: { key: any; map: (arg0: (x: any) => any) => any; }) => {
        if (!isMulti) {
            props.onChange(val?.key)
        } else {
            let rs = val.map((x: { key: any; }) => x?.key)
            props.onChange(rs)
        }
    }
    let showError = false;

    let arr = name.split(".");

    let error = null

    if (arr.length >= 1 && errors !== null) {
        let result = arr.reduce((rs, e) => {
            if (rs[e]) {
                return rs = rs[e]
            }
            return {}

        }, errors)
        error = result
        showError = !_.isEmpty(error);
    }
    const getValue = () => {
        if (!isMulti) {
            return options?.find((x: { key: any; }) => x?.key == value);
        } else {
            return options?.filter((x: { key: any; }) => value.includes(Number.parseInt(x.key)));
        }

    }
    return (
        <div className={styles["CustomSelect"]}>
            <Tooltip
                placement="bottom"
                arrow
                classes={{ arrow: styles["arrow"], tooltip: styles["tooltip"] }}
                title={(showError && isTooltip) ? (
                    <MessageError
                        type={error?.type}
                        message={error?.message}
                        style={{ color: "red", marginTop: "0px" }}
                    />
                ) : ""}
            >
                <div>
                    <Select
                        name={name}
                        ref={ref}
                        className={styles["select"]}
                        options={props.options} styles={{
                            menu: base => ({ ...base, zIndex: 2 }),
                            control: base => ({
                                ...base, minHeight: 32, height: 32, borderRadius: 3, border: `1px solid ${showError ? "red" : "#d8d7d7"}`,
                                boxShadow: 'unset',
                                "&:hover": {
                                    borderColor: "#138300"
                                },
                                "&:focus": {
                                    borderColor: "#138300",
                                    boxShadow: 'unset'
                                },
                                backgroundColor: disabled? '#e2e4e7' : '#fff',
                            }),
                            placeholder: base => ({ ...base, fontWeight: 400, color: '#C7C7C7', opacity: 1 }),
                            option: (base, {isSelected}) => ({ ...base, fontWeight: 400, color: '#333333',  backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.04)' : '#fff' }),
                            singleValue: base => ({ ...base, fontWeight: 400, color: '#333333', textAlign: 'left' }),
                            indicatorSeparator: base => ({ ...base, width: 0 }),
                            indicatorsContainer: base => ({ ...base, minHeight: 32, height: 32}),
                            clearIndicator: base => ({ ...base, padding: 0}),
                        }}
                        placeholder={placeholder}
                        onChange={onChange}
                        escapeClearsValue={escapeClearsValue}
                        isSearchable={isSearchable}
                        noOptionsMessage={noOptionsMessage}
                        isDisabled={disabled}
                        value={getValue()}
                        isClearable={isClearable}
                        isMulti={isMulti}
                    />
                </div>
            </Tooltip>
            {
                (showError && !isTooltip) ? (
                    <MessageError type={error?.type} message={error?.message} />
                ) : <></>
            }
        </div>
    )
})

export default CustomSelect;