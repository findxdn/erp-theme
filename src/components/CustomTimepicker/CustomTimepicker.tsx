import * as React from "react";
import { IconClock } from "../../assets/icons/index";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TimePicker from "@mui/lab/TimePicker";
import MessageError from "../../utils/MessageError";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@mui/styles"
import _ from "lodash";

export interface CustomTimepickerProps {
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
  isTooltip?: any;
  placeholder?: any;
  value?: any;
  isOpenTabelSetDate?: any;
  disabled?: any;
}

const CustomTimepicker = (props: CustomTimepickerProps) => {
  const {
    errors = null,
    name = "",
    styled,
    inputFormat = "hh:mm",
    className,
    value,
    isTooltip = false,
    placeholder,
    onChange,
    onBlur,
    ref,
    disabled = false,
    isOpenTabelSetDate = true,
  } = props;

  let showError = false;

  const [open, setOpen] = React.useState(false);

  let error: { message: string; type: string; }
  let arr = name.split(".");
  if (arr.length >= 1 && errors !== null) {
    let result = arr.reduce((rs, e) => {
      if (rs[e]) {
        return rs = rs[e]
      }
      return {}

    }, errors)
    error = result
    showError = !_.isEmpty(error);
  }

  const style = {
    width: "100%",
    color: "#333333",
    zIndex: "1",
    margin: "0px",
    "& .MuiOutlinedInput-input": {
      paddingLeft: "10px",
      fontSize: "14px !important",
      fontWidth: 400,
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: `${disabled ? '#e2e4e7' : '#ffffff'}`,
      borderRadius: "3px",
      height: "32px",
      width: "100%",
      borderColor: "#138300",
      "& .MuiOutlinedInput-notchedOutline": {
        paddingLeft: "10px !important",
        border: `${disabled ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#d8d7d7'}`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: `${disabled ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `${disabled ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
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
    },
  }));

  let classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} required>
      <TimePicker
        {...props._props}
        value={props?.value}
        onChange={(e) => props.onChange(e)}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        components={{
          OpenPickerIcon: IconClock,
        }}
        disabled={disabled}
        inputFormat={inputFormat}
        renderInput={(params) => {
          return (
            <Tooltip
              placement="bottom"
              arrow
              classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
              title={(error?.message && isTooltip) ? (
                <MessageError
                  type={error?.type}
                  message={error?.message}
                  style={{ color: "red", marginTop: "0px" }}
                />
              ) : ""}>
              <TextField
                {...params}
                onClick={(e) => isOpenTabelSetDate && disabled && setOpen(true)}
                className={className}
                error={showError}
                fullWidth
                sx={styled ? styled : style}
                inputProps={{
                  ...params.inputProps,
                  sx: {
                    "&::placeholder": {
                      fontSize: 14,
                      color: '#333333',
                    }
                  },
                  placeholder: placeholder
                }}
              />
            </Tooltip>
          );
        }}
      />
      {(error?.message && !isTooltip) && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </LocalizationProvider>
  );
};

export default CustomTimepicker;
