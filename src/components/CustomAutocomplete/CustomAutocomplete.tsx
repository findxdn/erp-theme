/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";

import _ from "lodash";
import MessageError from "../../utils/MessageError";

export interface CustomAutocompleteProps {
  name: string;
  placeholder?: any;
  onChange?: any;
  options?: any;
  register?: any;
  errors?: any;
}

function CustomAutocomplete(props: CustomAutocompleteProps) {
  const { placeholder, options = [], name, register, errors, onChange } = props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  return (
    <>
      <Autocomplete
        onChange={onChange}
        options={options}
        popupIcon={<ExpandMoreSharpIcon />}
        renderInput={(params) => (
          <TextField
            {...register}
            {...params}
            margin="normal"
            color="success"
            size="small"
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
