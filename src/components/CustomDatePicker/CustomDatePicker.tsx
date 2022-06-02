import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import _ from "lodash";
import { IcDateTime } from "../../assets/icons/index";
import MessageError from "../../utils/MessageError";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

export interface CustomDatePickerProps {
  name?: string;
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

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const {
    errors,
    name="",
    styled,
    inputFormat = "dd/MM/yyyy",
    className,
    value,
    defaultValue = "",
    isTooltip = false,
    placeholder,
    onChange,
    onBlur,
    ref,
  } = props;

  let showError = false;

  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
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
        borderColor: `${(showError)? '#FF0000' : '#d8d7d7'}`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: `${(showError)? '#FF0000' : '#138300'}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${(showError)? '#FF0000' : '#138300'}`,
      },
    },
  };
  
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
      <DatePicker
        value={props?.value}
        onChange={ (e) => props.onChange(e)}
        components={{
          OpenPickerIcon: IcDateTime,
        }}
        inputFormat={inputFormat}
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

export default CustomDatePicker;
