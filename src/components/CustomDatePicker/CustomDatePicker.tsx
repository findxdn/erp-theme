import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import _ from "lodash";
import { IcDateTime } from "../../assets/icons/index";
import MessageError from "../../utils/MessageError";

export interface CustomDatePickerProps {
  name: string;
  register?: any;
  errors?: any;
  onChange?: any;
  styled?: any;
  className?: string;
  inputFormat?: any;
  _props?: any;
  setValue?: any;
  value?: any;
}

const style = {
  width: "100%",
  fontSize: 14,
  color: "#333333",
  zIndex: "1",
  margin: "0px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    height: "32px",
    width: "100%",
    borderColor: "#138300",
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

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const {
    errors,
    name,
    styled,
    inputFormat = "dd/MM/yyyy",
    className,
    setValue,
    value = "",
  } = props;

  const handleOnchange = (newValue: any) => {
    props.onChange && props.onChange(newValue);
    setValue(name, newValue);
  };

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} required>
      <DatePicker
        {...props}
        className={className}
        value={value}
        onChange={handleOnchange}
        components={{
          OpenPickerIcon: IcDateTime,
        }}
        inputFormat={inputFormat}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              error={showError}
              fullWidth
              sx={styled ? styled : style}
            />
          );
        }}
      />

      {showError && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
