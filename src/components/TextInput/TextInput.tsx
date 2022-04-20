import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import _ from 'lodash'
import { IcEyeClose } from '../assets/icons'
import MessageError from '../../utils/MessageError';

export interface TextInputProps {
    name: string;
    placeholder?: any;
    value?: any;
    onChange?: any;
    disabled?: any;
    onBlur?: any;
    errors?: any;
    defaultValue?: any;
    type?: any;
    isPassword?: any;
  }

const TextInput = (props: TextInputProps)=>{
    const {name,
        placeholder,
        value,
        onChange,
        onBlur,
        errors,
        type,
        defaultValue,
        isPassword} = props;

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  const [showIcRight, setShowIcRight] = useState(true)

  const handleOnclickIconRight = () => {
    setShowIcRight(!showIcRight);
  }

  return (
    <Box
      component="form"
      autoComplete="off"
    >
      <TextField
        margin="normal"
        color="success"
        size="small"
        required
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        type={isPassword ? 'password' : type}
        error={showError}
        fullWidth
        placeholder={placeholder}
      />
      {
        isPassword && (
          <div
            className="iconRight-textInput"
            role="button"
            onClick={handleOnclickIconRight}
          >
            <IcEyeClose />
          </div>
        )
      }
      {
         showError && <MessageError type={errors[name].type} message={errors[name].message} />
      }
    </Box>
  )
}

export default TextInput;