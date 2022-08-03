import React from "react";
import Box from "@mui/material/Box";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import MessageError from "../../utils/MessageError";

export interface TextNoteProps {
  name: string;
  placeholder?: string;
  value?: any;
  disabled?: any,
  onChange?: any;
  onBlur?: any;
  errors?: any;
  type?: any;
  defaultValue?: string;
  isPassword?: string;
  minHeight?: any;
  maxHeight?: any;
  className?: string;
  _props?: any;
}

const StyleTextArea = styled(({ ...rest }) => <textarea {...rest} />)(
  ({ isError, maxHeight, minHeight, disabled }) => ({
    width: "100%",
    maxHeight: `${maxHeight}px`,
    minHeight: `${minHeight}px`,
    border: `1px solid ${isError ? "red" : "#d8d7d7"}`,
    backgroundColor: `${(disabled) ? '#e2e4e7' : '#ffffff'}`,
    padding: "10px",
    borderRadius: "3px",
    "&:hover": {
      border: `${(disabled) ? '0px' : '1px'} solid ${(isError) ? '#FF0000' : '#d8d7d7'}`,
    },
    "&:focus": {
      outline: "none !important",
      border: `${(disabled) ? '0px' : '1px'} solid ${(isError) ? '#FF0000' : '#138300'}`,
    },
  })
);

export default function TextNote(props: TextNoteProps) {
  const {
    placeholder,
    name,
    errors = null,
    onChange,
    disabled = false,
    value,
    onBlur,
    minHeight = 40,
    maxHeight = 150,
    className,
    defaultValue,
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
  return (
    <Box className={className}>
      <StyleTextArea
        {...props._props}
        isError={showError}
        fullWidth
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        minHeight={minHeight}
        maxHeight={maxHeight}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </Box>
  );
}
