/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import { IconButton } from '@mui/material'
import { IcDateTime } from "../../assets/icons/index";
import MessageError from "../../utils/MessageError";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@mui/styles";

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
  _inputProps?: any;
}

function TextInput(props: TextInputProps) {
  const {
    ref,
    placeholder,
    value = '',
    onChange = () => { },
    readOnly = false,
    onBlur,
    defaultValue = '',
    className,
    isTooltip,
    textAlign = 'left',
    onKeyUp,
    onKeyDown,
    name,
    onKeyPress,
    disabled = false,
    errors = null,
  } = props;

  let showError = false;

  const arr = props?.name.split('.');

  let error = null

  if (arr.length >= 1 && errors !== null) {
    const result = arr.reduce((rs?: any, e?: any) => {
      if (rs[e]) {
        return rs = rs[e]
      }
      return {}
    }, errors)
    error = result
    showError = !_.isEmpty(error);
  }
  const style = {
    width: '100%',
    fontSize: 14,
    color: '#333333',
    zIndex: '1',
    '& .MuiInputBase-input': {
      padding: '4px 10px',
      '$ .MuiOutlinedInput-input': {
        padding: '4px 10px',
      },
      textAlign: { textAlign },
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '3px',
      height: '32px',
      width: '100%',
      fontSize: 14,
      color: '#333333',
      zIndex: '1',
      backgroundColor: `${(readOnly || disabled) ? '#e2e4e7' : '#ffffff'}`,
      paddingRight: '0px',
      '& .MuiOutlinedInput-notchedOutline': {
        border: `${(readOnly || disabled) ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#d8d7d7'}`,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: `${(readOnly || disabled) ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `${(readOnly || disabled) ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
      },
    },
  };

  const useStyles = makeStyles((theme: any) => ({
    arrow: {
      "&:before": {
        border: "1px solid #FF0000",
        color: "#ffffff"
      }
    },
    tooltip: {
      fontSize: '14px !important',
      backgroundColor: '#ffffff !important',
      borderRadius: '3px',
      border: '1px solid #FF0000',
      marginTop: '10px !important',
      "&:.p": {
        marginTop: '0px !important',
      }
    }
  }));

  let classes = useStyles();

  return (
    <Box className={className} sx={{ width: '100%', padding: '0px' }}>
      <Tooltip
        placement="bottom"
        arrow
        classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
        title={(error?.message && isTooltip) ? (
          <MessageError
            type={error?.type}
            message={error?.message}
            style={{ color: "red", marginTop: "0px" }}
          />
        ) : ""}>
        <TextField
          {...props._props}
          disabled={disabled}
          inputProps={{
            readOnly,
            ...props._inputProps,
          }}
          InputProps={{
            endAdornment:
              <IconButton
                style={{
                  height: '28px',
                  width: '28px',
                  padding: '2px 0px 2px 0px',
                  marginRight: '10px',
                }}
              >
                <IcDateTime />
              </IconButton>,
          }}
          sx={style}
          // name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          // type={showPassword ? 'password' : type}
          error={showError}
          fullWidth
          placeholder={placeholder}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
        />
      </Tooltip>
      {
        (error?.message && !isTooltip) ? (
          <MessageError type={error?.type} message={error?.message} />
        ) : <></>
      }
    </Box>
  );
}

export default TextInput;
