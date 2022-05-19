/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";

import _ from "lodash";
import MessageError from "../../utils/MessageError";

export interface CustomAutocompleteProps {
  name: string;
  className?: string;
  placeholder?: any;
  onChange?: any;
  options?: any;
  register?: any;
  errors?: any;
  styles?: any;
  defaultValue?: any;
  _props?: any;
  ref?: any;
  setValue?: any;
  value?: any;
}

const styleTextField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    height: "32px",
    padding: "0px",
    width: "100%",
    fontSize: 14,
    color: "#333333",
    zIndex: "1",
    "& .MuiOutlinedInput-input": {
      height: "16px",
      paddingLeft: "10px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#138300",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #138300",
    },
  },
};

function CustomAutocomplete(props: CustomAutocompleteProps) {
  const {
    placeholder,
    options = [],
    name,
    errors,
    onChange,
    defaultValue,
    styles,
    className,
    setValue,
    value,
    ref,
  } = props;

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  return (
    <>
      <Autocomplete
        ref={ref}
        value={options.find((x: any) => x.key == value)}
        onChange={(event, newValue) => {
          console.log(newValue);
          if (newValue === null) {
            setValue(name, null);
            onChange(null);
            return;
          }
          props.onChange && props.onChange(newValue.key);
          setValue(name, newValue.key);
        }}
        className={className}
        options={options}
        popupIcon={<ExpandMoreSharpIcon />}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              sx={styleTextField}
              placeholder={placeholder}
              error={showError}
            />
          );
        }}
      />

      {showError && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </>
  );
}

export default CustomAutocomplete;
