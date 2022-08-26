import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import _ from "lodash";
import { Tooltip } from '@mui/material';
import MessageError from "../../utils/MessageError";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

export interface SelectInputProps {
  name: string;
  placeholder?: string;
  value?: any;
  onChange?: any;
  errors?: any;
  options?: any;
  className?: any;
  onBlur?: any;
  ref?: any;
  disabled?: any;
  isTooltip?: any;
  _props: any;
  _inputProps: any;
}
const MenuProps = {
  PaperProps: {
    style: {
      color: "#333333",
    },
  },
};

const SelectInput = React.forwardRef((props: SelectInputProps, ref) => {
  const {
    options,
    placeholder,
    errors = null,
    value = [],
    name,
    onChange,
    className,
    onBlur,
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

  const style = {
    width: "100%",
    fontSize: 14,
    color: "#333333",
    zIndex: "1",
    borderRadius: "3px",
    backgroundColor: `${disabled ? '#e2e4e7' : '#ffffff'}`,
    ".MuiSelect-select": {
      padding: "6px 10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `${disabled ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#d8d7d7'}`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${disabled ? '' : (showError) ? '#FF0000' : '#138300'}`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `${disabled ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
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
    <div>
      <FormControl error={showError} fullWidth>
        <Select
          {...props._props}
          name={name}
          sx={style}
          IconComponent={ExpandMoreSharpIcon}
          fullWidth
          displayEmpty
          value={value}
          onChange={onChange}
          input={
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
              <OutlinedInput />
            </Tooltip>
          }
          inputProps={{ 
            MenuProps: { disableScrollLock: true },
            ...props._inputProps,
          }}
          MenuProps={MenuProps}
          className={className}
          placeholder={placeholder}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          renderValue={(values) => {
            if (props?.value !== null && isNaN(props?.value)) {
              return value?.label
            }
            const dataChange = options.find((x: any) => x.value == values);
            if (
              dataChange === "" ||
              dataChange === null ||
              values === "" ||
              values === null
            ) {
              return <p className="placeholder-select" style={{
                fontSize: 14,
                color: '#a9a9a9'
              }}>{placeholder}</p>;
            }
            return dataChange?.label;
          }}
        >
          {Array.isArray(options) ?
            (options.map((option: { value: any; label: any }) => (
              <MenuItem key={option?.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))) : {}}
        </Select>
        {(error?.message && !isTooltip) && (
          <MessageError type={error?.type} message={error?.message} />
        )}
      </FormControl>
    </div>
  );
})

export default SelectInput;
