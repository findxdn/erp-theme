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
}

const style = {
  width: "100%",
  fontSize: 14,
  paddingRight: "10px",
  color: "#333333",
  zIndex: "1",
  ".MuiSelect-select": {
    padding: "6px 10px",
    borderRadius: "5px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d8d7d7",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `2px solid #`,
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottom: `1px solid #b3292a`,
  },
  "&:after": {
    borderBottom: `1px solid #b3292a`,
  },
};

function CustomAutocomplete(props: CustomAutocompleteProps) {
  const {
    placeholder,
    options = [],
    name,
    register,
    errors,
    onChange,
    styles,
    className,
  } = props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  const [value, setValue] = React.useState<string | null>(options[0]);

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          onChange(newValue);
          setValue(newValue);
        }}
        sx={style}
        className={className}
        options={options}
        popupIcon={<ExpandMoreSharpIcon />}
        renderInput={(params) => (
          <TextField
            {...register}
            {...params}
            fullWidth
            placeholder={placeholder}
            error={showError}
          />
        )}
      />
      {showError && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </>
  );
}

export default CustomAutocomplete;
