import React from "react";
import Box from "@mui/material/Box";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import MessageError from "../../utils/MessageError";

export interface TextNoteProps {
  name: string;
  placeholder?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  errors?: any;
  type?: any;
  defaultValue?: string;
  isPassword?: string;
  minHeight?: any;
  maxHeight?: any;
  className?: string;
  ref?: string;
}

export default function TextNote(props: TextNoteProps) {
  const {
    placeholder,
    name,
    errors = null,
    onChange,
    value,
    onBlur,
    minHeight = 40,
    maxHeight = 150,
    className,
    defaultValue,
    ref = null,
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

  const style = {
    width: "100%",
    maxHeight: `${maxHeight}px`,
    minHeight: `${minHeight}px`,
    border: `1px solid ${showError ? "red" : "#d8d7d7"}`,
    padding: "10px",
    borderRadius: "3px",
    "& .textarea": {
      "&:hover .textarea": {
        outline: "none !important",
        border: `1px solid ${showError ? "FF0000" : "#138300"}`,
      },
      "&:focus": {
        outline: "none !important",
        border: `1px solid ${showError ? "FF0000" : "#138300"}`,
      },
    },
    "& .textarea :focus": {
      outline: "none !important",
      border: `1px solid ${showError ? "FF0000" : "#138300"}`,
    },
  }

  return (
    <Box className={className}>
      <textarea
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        style={style}
        value={value}
        ref={ref}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </Box>
  );
}
