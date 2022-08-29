import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@mui/styles";
import { Tooltip } from '@mui/material';
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import MessageError from "../../utils/MessageError";
import _ from 'lodash';
import { useClickAway } from "react-use";

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

const GroupSelect = React.forwardRef((props: GroupSelectProps, ref) => {
  const {
    placeholder,
    options = [],
    name,
    errors = null,
    onChange,
    value,
    defaultValue,
    styles,
    className,
    disabled = false,
    isTooltip = false,
  } = props;
  let showError = false;
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
  const refs = React.useRef(null);
  useClickAway(refs, () => {
  });
  return (
    <div ref={refs}>
      <Autocomplete
        {...props._props}
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
        renderInput={(params) =>
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
              fullWidth
              sx={styleTextField}
              placeholder={placeholder}
              error={showError}
            />
          </Tooltip>
        }
      />
      {(error?.message && !isTooltip) && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </div>
  );
})

export default GroupSelect;