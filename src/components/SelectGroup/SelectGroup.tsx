import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import _ from "lodash";
import "./SelectGroup.scss";
import MessageError from "../../utils/MessageError";

export interface SelectGroupProps {
  name: string;
  placeholder?: string;
  value?: any;
  onChange?: any;
  register?: any;
  errors?: any;
  options?: any;
  className?: any;
  disabled?: any;
  _props?: any;
}

const MenuProps = {
  PaperProps: {
    style: {
      color: "#333333",
    },
  },
};

function SelectGroup(props: SelectGroupProps) {
  const {
    options,
    placeholder,
    errors = null,
    name,
    value,
    disabled = false,
    register,
    onChange,
    className,
  } = props;
  let showError = false;
  let error = null
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
    height: "32px",
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
          {...props._props}
          native
          name={name}
          sx={style}
          IconComponent={ExpandMoreSharpIcon}
          fullWidth
          displayEmpty
          disabled={disabled}
          value={value}
          onChange={onChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          className={className}
          defaultValue=""
        >
          <option aria-label="none" value="" label={placeholder} />
          {options.map(
            (option: {
              child: { label: any; value: any }[];
              label: any;
              value: any;
            }) =>
              option.child ? (
                <optgroup label={option.label} key={option.value} className="optgroupSelect">
                  {option.child.map((childData: { label: any; value: any }) => (
                    <option
                      key={childData.value}
                      label={childData.label}
                      value={childData.value}
                      className="optionSelect"
                    />
                  ))}
                </optgroup>
              ) : (
                <option
                  label={option.label}
                  key={option.value}
                  value={option.value}
                  className="optgroupSelect"
                />
              )
          )}
        </Select>
        {error?.message && (
          <MessageError type={error?.type} message={error?.message} />
        )}
      </FormControl>
    </div>
  );
}

export default SelectGroup;
