import Box from '../Box';
import { Tooltip } from '@mui/material';
import _ from 'lodash';
import MessageError from '../../utils/MessageError';
import styles from "./TextInput.module.scss";
import React from 'react';

export interface TextInputProps {    
    name: string;
    placeholder?: any;
    ref?: any;
    value?: any;
    onChange?: any;
    disabled?: any;
    onBlur?: any;
    errors?: any;
    defaultValue?: any;
    type?: any;
    isPassword?: any;
    className?: string;
    isTooltip?: any;
    readOnly?: any;
    _props?: any;
    textAlign?: any;
    onKeyUp?: any;
    onKeyDown?: any;
    onKeyPress?: any;
    onChangeType?: any;
    _inputProps: any;
}
const CustomTextInput = React.forwardRef((props: TextInputProps, ref) {
    const {
        name,
        placeholder,
        value = '',
        onChange = () => { },
        readOnly = false,
        onBlur,
        errors = null,
        type = 'text',
        defaultValue = '',
        isPassword = false,
        isTooltip = false,
        className,
        textAlign = 'left',
        onKeyUp,
        onKeyDown,
        onKeyPress,
        onChangeType = null,
        disabled = false,
    } = props;

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

    return (
        <div className={styles["TextInput"]}>
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
                ) : ""}>
                <input 
                    disabled={disabled}  
                    name={name} 
                    ref={ref} 
                    type="text" {...props} 
                    className={`${showError ? styles["error"] : styles["success"]}`} 
                />
            </Tooltip>
            {
                (showError && !isTooltip) ? (
                    <MessageError type={error?.type} message={error?.message} />
                ) : <></>
            }
        </div>
    )
})

export default CustomTextInput;