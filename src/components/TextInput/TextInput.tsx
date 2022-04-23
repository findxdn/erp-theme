import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import { IcEyeClose } from "../assets/icons";
import MessageError from "../../utils/MessageError";
import { Theme, useTheme } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";

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
  className?: string;
}

const style = {
  width: "100%",
  fontSize: 14,
  color: "#333333",
  zIndex: "1",
  "& .MuiInputBase-root": {
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
      borderColor: "#d8d7d7",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#138300",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #138300",
    },
  },
};

const TextInput = (props: TextInputProps) => {
  const {
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    errors,
    type,
    defaultValue,
    isPassword,
    className,
  } = props;

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  const [showIcRight, setShowIcRight] = useState(true);

  const handleOnclickIconRight = () => {
    setShowIcRight(!showIcRight);
  };

  return (
    <Box
      sx={{ width: "100%", padding: "0px" }}
      component="form"
      autoComplete="off"
      className={className}
    >
      <TextField
        sx={style}
        required
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        type={isPassword ? "password" : type}
        error={showError}
        fullWidth
        placeholder={placeholder}
      />
      {isPassword && (
        <div
          className="iconRight-textInput"
          role="button"
          onClick={handleOnclickIconRight}
        >
          <IcEyeClose />
        </div>
      )}
      {showError && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </Box>
  );
};

export default TextInput;