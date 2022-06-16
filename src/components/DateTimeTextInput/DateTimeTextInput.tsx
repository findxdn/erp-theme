import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import MessageError from "../../utils/MessageError";
import { IcEyeClose } from "../../assets/icons/index";
import "./DateTimeTextInput.scss";

export interface DateTimeTextInputProps {
  name: string;
  placeholder?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  errors?: any;
  type?: any;
  defaultValue?: string;
  isPassword?: string;
  className?: string;
}

const style = {
  width: "100%",
  fontSize: 14,
  color: "#333333",
  zIndex: "1",
  "& .MuiOutlinedInput-root": {
    borderRadius: "3px",
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

export default function DateTimeTextInput(props: DateTimeTextInputProps) {
  const {
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    errors = null,
    type,
    defaultValue,
    isPassword,
    className,
  } = props;

  let showError = false;
  let error = null
  let arr = name.split(".");
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
  const [showIcRight, setShowIcRight] = useState(true);
  const handleOnclickIconRight = () => {
    setShowIcRight(!showIcRight);
  };
  return (
    <Box sx={{ position: "relative" }} className={className}>
      <TextField
        name={name}
        sx={style}
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
      {error?.message && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </Box>
  );
}
