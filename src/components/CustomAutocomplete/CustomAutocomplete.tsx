/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import { Tooltip } from '@mui/material';
import _ from "lodash";
import MessageError from "../../utils/MessageError";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";

export interface CustomAutocompleteProps {
  name: string;
  className?: string;
  placeholder?: any;
  onChange?: any;
  options?: any;
  register?: any;
  errors?: any;
  styles?: any;
  defaultValue?: any;
  _props?: any;
  ref?: any;
  value?: any;
  isTooltip?: any;
  disabled?: any;
}

function CustomAutocomplete(props: CustomAutocompleteProps) {
  const {
    placeholder,
    options = [],
    name,
    errors,
    onChange,
    value,
    defaultValue,
    styles,
    className,
    disabled = false,
    ref,
    isTooltip = false,
  } = props;

  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  const styleTextField = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      height: "32px",
      padding: "0px",
      width: "100%",
      fontSize: 14,
      color: "#333333",
      zIndex: "1",
      backgroundColor: `${disabled ? '#e2e4e7':'#ffffff'}`,
      "& .MuiOutlinedInput-input": {
        height: "16px",
        paddingLeft: "10px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: `${ disabled ? '0px' : '1px' } solid ${(showError)? '#FF0000' : '#d8d7d7'}`,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: `${ disabled ? '0px' : '1px' } solid ${(showError)? '#FF0000' : '#138300'}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `${ disabled ? '0px' : '1px' } solid ${(showError)? '#FF0000' : '#138300'}`,
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
  }));


  let classes = useStyles();
  return (
    <>
      <Autocomplete
        value={options.find((x: any) => x.key == value) ?? null}
        onChange={(e, newValue) => {
          if(newValue) {
            onChange(newValue.key)
          } else {
            onChange(null)
          }
        }}
        disabled={disabled}
        className={className}
        defaultValue={defaultValue}
        options={options}
        popupIcon={<ExpandMoreSharpIcon />}
        renderInput={(params) => {
          const inputProps = params.inputProps;
          inputProps.autoComplete = "off";
          return (
            <Tooltip
              placement="bottom"
              arrow
              classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
              title={(showError && isTooltip) ? (
                <MessageError
                  type={errors[name].type}
                  message={errors[name].message}
                  style={{ color: "red", marginTop: "0px" }}
                />
              ) : ""}>
              <TextField
                {...params}
                fullWidth
                sx={styleTextField}
                placeholder={placeholder}
                error={showError}
              />
            </Tooltip>
          );
        }}
      />
      {(showError && !isTooltip) && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </>
  );
}

export default CustomAutocomplete;
