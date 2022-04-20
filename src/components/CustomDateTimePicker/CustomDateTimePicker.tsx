import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import _ from "lodash";
import { IcDateTime } from "../assets/icons";
import MessageError from "../../utils/MessageError";

export interface CustomDateTimePickerProps {
  name: string;
  register?: any;
  errors?: any;
  onChange?: any;
  values?: string;
}

const CustomDateTimePicker = (props: CustomDateTimePickerProps) => {
  const { register, errors, name, onChange, values } = props;
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
    const data = `${
      newValue.getMonth() + 1
    }/${newValue.getDate()}/${newValue.getFullYear()} ${newValue.getHours()}:${
      newValue.getMinutes() + 1
    }:${newValue.getSeconds()}`;
    setValue(data);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} required>
      <DateTimePicker
        // @ts-expect-error
        onChange={handleOnchange}
        value={value}
        components={{
          OpenPickerIcon: IcDateTime,
        }}
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField
            {...params}
            {...register}
            error={showError}
            fullWidth
            color="success"
            margin="normal"
            size="small"
            name={name}
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
