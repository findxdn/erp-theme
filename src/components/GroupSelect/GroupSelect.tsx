import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from 'chart.js';
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import MessageError from "../../utils/MessageError";
import _ from 'lodash';

export interface GroupSelectProps {
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
  inputRef?: any;
  isSearchOpitons?: any;
  onChangeInput?: any;
  noOptionsText?: any;
}


export default function GroupSelect(props: GroupSelectProps) {
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
      borderRadius: "3px",
      height: "32px",
      padding: "0px",
      width: "100% !important",
      fontSize: 14,
      color: "#333333",
      zIndex: "1",
      backgroundColor: `${disabled ? '#e2e4e7' : '#ffffff'}`,
      "& .MuiOutlinedInput-input": {
        height: "16px",
        paddingLeft: "10px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
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
  }));

  return (
    <>
      <Autocomplete
        value={options.find((x: { key: any; }) => x.key == value) ?? null}
        onChange={(e, newValue) => {
          if (newValue) {
            onChange(newValue.key)
          } else {
            onChange(null)
          }
        }}
        disabled={disabled}
        className={`${className} w-100`}
        defaultValue={defaultValue}
        options={options}
        groupBy={(option) => option.ParentName}
        getOptionLabel={(option) => option.label}
        sx={{ width: 300 }}
        popupIcon={<ExpandMoreSharpIcon />}
        renderInput={(params) => <TextField
          {...params}
          fullWidth
          sx={styleTextField}
          placeholder={placeholder}
          error={showError}
        />}
      />
      {(showError && !isTooltip) && (
        <MessageError type={errors[name].type} message={errors[name].message} />
      )}
    </>
  );
}

