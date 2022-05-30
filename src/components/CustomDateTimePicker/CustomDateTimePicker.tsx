import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import _ from "lodash";
import { IcDateTime } from "../../assets/icons/index";
import MessageError from "../../utils/MessageError";

export interface CustomDateTimePickerProps {
  name: string;
  register?: any;
  errors?: any;
  onChange?: any;
  values?: string;
  defaultValue?: any;
  className?: string;
  styled?: any;
  _props?: any;
}

const style = {
  width: "100%",
  fontSize: 14,
  color: "#333333",
  zIndex: "1",
  marginTop: "0px",
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

const CustomDateTimePicker = (props: CustomDateTimePickerProps) => {
  const { register, errors, name, onChange, defaultValue, values, className, styled } = props;
  const [value, setValue] = React.useState(values);
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  const handleOnchange = (newValue: {
    getMonth: () => number;
    getDate: () => number;
    getFullYear: () => number;
    getHours: () => number;
    getMinutes: () => number;
    getSeconds: () => number;
  }) => {
    if (newValue != null) {
      const data = `${
        newValue.getMonth() + 1
      }/${newValue.getDate()}/${newValue.getFullYear()} ${newValue.getHours()}:${
        newValue.getMinutes() + 1
      }:${newValue.getSeconds()}`;
      setValue(data);
    } else {
      setValue("");
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} required>
      <DateTimePicker
        {...props._props}
        onChange={handleOnchange}
        value={value}
        components={{
          OpenPickerIcon: IcDateTime,
        }}
        defaultValue={defaultValue}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField
            sx={styled ? styled : style}
            {...params}
            error={showError}
            fullWidth
            name={name}
            className={className}
            onChange={onChange(value)}
          />
        )}
      />
      {showError && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
