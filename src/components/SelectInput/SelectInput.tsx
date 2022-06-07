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
}
const MenuProps = {
  PaperProps: {
    style: {
      color: "#333333",
    },
  },
};

const style = {
  width: "100%",
  fontSize: 14,
  paddingRight: "10px",
  color: "#333333",
  zIndex: "1",
  ".MuiSelect-select": {
    padding: "6px 10px",
    borderRadius: "3px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0.5px solid #d8d7d7",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `0.5px solid #138300`,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: `0.5px solid #138300`,
  },
  "&:after": {
    borderBottom: `0.5px solid #138300`,
  },
};

function SelectInput(props: SelectInputProps) {
  const {
    options,
    placeholder,
    errors,
    value,
    name,
    onChange,
    className,
    onBlur,
    ref,
  } = props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
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
          MenuProps={MenuProps}
          className={className}
          placeholder={placeholder}
          onBlur={onBlur}
          ref={ref}
          renderValue={(values) => {
            if( isNaN(value) && value.label) {
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
                color: '#8e8e8e'
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
