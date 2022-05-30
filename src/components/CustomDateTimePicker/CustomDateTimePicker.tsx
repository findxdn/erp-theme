import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import _ from "lodash";
import { IcDateTime } from "../../assets/icons/index";
import MessageError from "../../utils/MessageError";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

export interface CustomDateTimePickerProps {
  name: string;
  register?: any;
  errors?: any;
  onChange?: any;
  onBlur?: any;
  ref?: any;
  styled?: any;
  className?: string;
  inputFormat?: any;
  _props?: any;
  defaultValue?: any;
  isTooltip?: any;
  placeholder?: any;
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
  const { 
    register, 
    errors, 
    name, 
    onChange, 
    defaultValue, 
    className, 
    styled,
    isTooltip = false,
    placeholder,
    onBlur,
    ref,
  } = props;

  const [value, setValue] = React.useState(defaultValue ? defaultValue : null);

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  const handleOnchange = (newValue) => {
    setValue(newValue)
    onChange(newValue)
  };

  const useStyles = makeStyles(theme => ({
    arrow: {
      "&:before": {
        border: "1px solid #FF0000",
        color: "#ffffff"
      }
    },
  }));

  let classes = useStyles();

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
        renderInput={(params) => {
          return (
            <Tooltip 
              placement="bottom"
              arrow
              classes={{ arrow: classes.arrow }}
              title={ (showError && isTooltip) ? (
              <MessageError 
                type={errors[name].type} 
                message={errors[name].message} 
                style={{ color: "red", marginTop: "0px" }}
              />
            ) : "" }>
              <TextField
                {...params}
                className={className}
                error={showError}
                fullWidth
                sx={styled ? styled : style}
                inputProps={{
                  ...params.inputProps,
                  placeholder: placeholder
                }}
              />
            </Tooltip>
          );
        }}
      />
      {(showError && !isTooltip) && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
