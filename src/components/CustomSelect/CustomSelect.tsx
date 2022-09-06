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
    fieldref?: any;
    isTooltip?: any;
    disabled?: any;
    isSearchOpitons?: any;
    onChangeInput?: any;
    noOptionsText?: any;
    isClearable?: any;
    isMulti?: any;
    escapeClearsValue?: any;
    noOptionsMessage?: any;
    isSearchable?: any;
    
  }
const CustomSelect = React.forwardRef((props: CustomSelectProps,ref) => {
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
        fieldref = null,
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

    const [ clearable, setIsClearable] = React.useState(false);

    const ClearIndicatorDemo = (props: any) => {
        const {
            innerProps: { ref, ...restInnerProps },
        } = props;
    
        return (
            <div
                {...restInnerProps}
                ref={ref}
                style={{display: `${clearable ? '' : 'none'}`,}}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.46967 6.46967C6.76256 6.17678 7.23744 6.17678 7.53033 6.46967L17.5303 16.4697C17.8232 16.7626 17.8232 17.2374 17.5303 17.5303C17.2374 17.8232 16.7626 17.8232 16.4697 17.5303L6.46967 7.53033C6.17678 7.23744 6.17678 6.76256 6.46967 6.46967Z" fill="#707070"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L7.53033 17.5303C7.23744 17.8232 6.76256 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967Z" fill="#707070"/>
                </svg>
            </div>
        );
    };
    
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
                        ref={fieldref !== null ? fieldref : ref}
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
                        }}
                        components={{ ClearIndicator: ClearIndicatorDemo}}
                        onMenuOpen={() => {
                            setIsClearable(true);
                        }}
                        onMenuClose={() => {
                            setIsClearable(false);
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