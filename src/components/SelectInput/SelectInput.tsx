import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import _ from "lodash";
import MessageError from "../../utils/MessageError";

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
}
const MenuProps = {
  PaperProps: {
    style: {
      color: "#333333",
    },
  },
};

function SelectInput(props: SelectInputProps) {
  const {
    options,
    placeholder,
    errors,
    value = [],
    name,
    onChange,
    className,
    onBlur,
    ref,
    disabled = false,
  } = props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  const style = {
    width: "100%",
    fontSize: 14,
    paddingRight: "10px",
    color: "#333333",
    zIndex: "1",
    borderRadius: "3px",
    backgroundColor: `${disabled ? '#e2e4e7' : '#ffffff'}`,
    ".MuiSelect-select": {
      padding: "6px 10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `${disabled ? '0px' : '1px'} solid #d8d7d7`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${disabled ? '' : '#138300'}`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `${disabled ? '0px' : '1px'} solid #138300`,
    },
  };

  return (
    <div>
      <FormControl error={showError} fullWidth>
        <Select
          name={name}
          sx={style}
          IconComponent={ExpandMoreSharpIcon}
          fullWidth
          displayEmpty
          value={value}
          onChange={onChange}
          input={<OutlinedInput />}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
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
        {showError && (
          <MessageError
            type={errors[name].type}
            message={errors[name].message}
          />
        )}
      </FormControl>
    </div>
  );
}

export default SelectInput;
