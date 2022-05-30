import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { IcEyeClose } from "../../assets/icons/index";
import MessageError from "../../utils/MessageError";
import "./TextInput.scss";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

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
}

const TextInput = (props: TextInputProps) => {
  const {
    ref,
    name,
    placeholder,
    value,
    onChange = () => {},
    readOnly,
    onBlur,
    errors,
    type,
    defaultValue,
    isPassword,
    isTooltip = false,
    className,
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
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      height: "32px",
      width: "100%",
      fontSize: 14,
      color: "#333333",
      zIndex: "1",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${(showError)? '#FF0000' : '#d8d7d7'}`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: `${(showError)? '#FF0000' : '#138300'}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${(showError)? '#FF0000' : '#138300'}`,
      },
    },
  };

  const [showIcRight, setShowIcRight] = useState(true);

  const handleOnclickIconRight = () => {
    setShowIcRight(!showIcRight);
  };

  const useStyles = makeStyles(theme => ({
    arrow: {
      "&:before": {
        border: "1px solid #FF0000",
        color: "#ffffff"
      }
    },
  }));


  
  let classes = useStyles();

  return (
    <Box className={className} sx={{ width: "100%", padding: "0px" }}>
      <Tooltip 
        placement="bottom"
        arrow
        classes={{ arrow: classes.arrow }}
        title={ (showError && isTooltip) ? (
        <MessageError 
          type={errors[name].type} 
          message={errors[name].message} 
          style={{ color: "red", marginTop: "0px" }}
        />
      ) : "" }>
        <TextField
          {...props._props}
          classes={readOnly ? { root: 'Mui-disabled' } : {}}
          sx={style}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          type={isPassword ? "password" : type}
          error={showError}
          fullWidth
          placeholder={placeholder}
        />
      </Tooltip>
      {isPassword && (
        <div
          className="iconRight-textInput"
          role="button"
          onClick={handleOnclickIconRight}
        >
          <IcEyeClose />
        </div>
      )}
      {(showError && !isTooltip) ? (
        <MessageError type={errors[name].type} message={errors[name].message} />
      ) : <></>}
    </Box>
  );
};

export default TextInput;
