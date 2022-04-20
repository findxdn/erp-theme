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
}

const StyleTextArea = styled(({ ...rest }) => <textarea {...rest} />)(
  ({ isError, maxHeight, minHeight }) => ({
    width: "100%",
    maxHeight: `${maxHeight}px`,
    minHeight: `${minHeight}px`,
    border: `1px solid ${isError ? "red" : "#afafaf"}`,
    padding: "10px",
    borderRadius: "3px",
    "&:hover": {
      border: "1px solid black",
    },
    "&:focus": {
      outline: "1px solid green",
    },
  })
);

export default function TextNote(props: TextNoteProps) {
  const {
    placeholder,
    name,
    errors,
    onChange,
    onBlur,
    minHeight = 40,
    maxHeight = 150,
  } = props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  return (
    <Box component="form" noValidate autoComplete="off">
      <StyleTextArea
        isError={showError}
        fullWidth
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        minHeight={minHeight}
        maxHeight={maxHeight}
      />
      {showError && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </Box>
  );
}
