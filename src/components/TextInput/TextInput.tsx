import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { IcEyeClose, IcEyeOpen } from "../../assets/icons/index";
import MessageError from "../../utils/MessageError";
import "./TextInput.scss";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material'

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
}

const TextInput = (props: TextInputProps) => {
  const {
    ref,
    name,
    placeholder,
    value = '',
    onChange = () => { },
    readOnly = false,
    onBlur,
    errors,
    type = 'text',
    defaultValue = '',
    isPassword,
    isTooltip = false,
    className,
    textAlign = 'left',
    onKeyUp,
    onKeyDown,
    onKeyPress,
  } = props;

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  const style = {
    width: "100%",
    fontSize: 14,
    color: "#333333",
    zIndex: "1",
    "& .MuiInputBase-input": {
      padding: "4px 10px",
      "$ .MuiOutlinedInput-input": {
        padding: "4px 10px",
      },
      textAlign: { textAlign },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "3px",
      height: "32px",
      width: "100%",
      fontSize: 14,
      color: "#333333",
      zIndex: "1",
      backgroundColor: `${readOnly ? '#e2e4e7' : '#ffffff'}`,
      paddingRight: '0px',
      "& .MuiOutlinedInput-notchedOutline": {
        border: `${readOnly ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#d8d7d7'}`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: `${readOnly ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `${readOnly ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
      },
    },
  };

  const [showPassword, setShowPassword] = useState(isPassword);

  const handleOnclickIconRight = () => {
    setShowPassword(!showPassword);
  };

  const useStyles = makeStyles(theme => ({
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
    <Box className={className} sx={{ width: "100%", padding: "0px" }}>
      <Tooltip
        placement="bottom"
        arrow
        classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
        title={(showError && isTooltip) ? (
          <MessageError
            type={errors[name].type}
            message={errors[name].message}
            style={{ color: "red", marginTop: "0px" }}
          />
        ) : ""}>
        <TextField
          {...props._props}
          inputProps={{
            readOnly: readOnly,
          }}
          InputProps={{
            endAdornment: isPassword ?
              (
                <IconButton
                  onClick={handleOnclickIconRight}
                  style={{
                    height: '24px',
                    width: '30px',
                    padding: '2px 0px 2px 8px',
                    marginRight: '3px',
                  }}
                >
                  <InputAdornment position="start">
                    {showPassword ? <IcEyeClose /> : <IcEyeOpen />}
                  </InputAdornment>
                </IconButton>
              ) : <></>
          }}
          sx={style}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          type={showPassword ? "password" : type}
          error={showError}
          fullWidth
          placeholder={placeholder}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
        />
      </Tooltip>
      {
        (showError && !isTooltip) ? (
          <MessageError type={errors[name].type} message={errors[name].message} />
        ) : <></>
      }
    </Box >
  );
};

export default TextInput;
