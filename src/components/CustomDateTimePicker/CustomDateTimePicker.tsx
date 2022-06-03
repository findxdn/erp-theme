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
  value?: any;
}

const style = {
  width: "100%",
  fontSize: 14,
  color: "#333333",
  zIndex: "1",
  marginTop: "0px",
  "& .MuiOutlinedInput-input": {
    paddingLeft: "10px",
    fontSize: "14px !important",
    fontWidth: 400,
  },
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
    value,
    ref,
  } = props;

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  const useStyles = makeStyles(theme => ({
    arrow: {
      "&:before": {
        border: "1px solid #FF0000",
        color: "#ffffff"
      }
    },
    tooltip: {
      fontSize: '14px !important',
      backgroundColor: '#ffffff !important',
      borderRadius: '3px',
      border: '1px solid #FF0000',
      marginTop: '10px !important',
      "&:.p": {
        marginTop: '0px !important',
      }
    }
  }));

  let classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} required>
      <DateTimePicker
        {...props._props}
        onChange={ (e) => props.onChange(e)}
        value={props?.value}
        components={{
          OpenPickerIcon: IcDateTime,
        }}
        defaultValue={defaultValue}
        renderInput={(params) => {
          return (
            <Tooltip 
              placement="bottom"
              arrow
              classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
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
                defaultValue={defaultValue}
                inputProps={{
                  ...params.inputProps,
                  sx: {
                    "&::placeholder": {
                      fontSize: 14,
                    }
                  },
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
