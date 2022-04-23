import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import _ from "lodash";
import { IcDateTime } from "../assets/icons";
import MessageError from "../../utils/MessageError";

export interface CustomDatePickerProps {
  name: string;
  options?: any;
  register?: any;
  errors?: any;
  disabled?: boolean;
  onChange?: any;
  styled?: any;
  className?: string;
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

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const { register, errors, name, onChange, styled, className } = props;
  const [value, setValue] = React.useState("");
  const handleOnchange = (newValue: {
    getMonth: () => number;
    getDate: () => any;
    getFullYear: () => any;
  }) => {
    const day = `${
      newValue.getMonth() + 1
    }/${newValue.getDate()}/${newValue.getFullYear()}`;
    setValue(day);
  };
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} required>
      <DatePicker
        className={className}
        value={value}
        // @ts-expect-error
        onChange={handleOnchange}
        components={{
          OpenPickerIcon: IcDateTime,
        }}
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => (
          <TextField
            {...params}
            {...register}
            error={showError}
            fullWidth
            sx={styled ? styled : style}
            name={name}
            value={value}
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

export default CustomDatePicker;