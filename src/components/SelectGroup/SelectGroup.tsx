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
  ".MuiNativeSelect-select": {
    padding: "6px 10px",
    borderRadius: "5px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d8d7d7",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#138300",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #138300",
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottom: "1px solid #138300",
  },
  "&:after": {
    borderBottom: "1px solid #138300",
  },
};

function SelectGroup(props: SelectGroupProps) {
  const {
    options,
    placeholder,
    errors,
    name,
    value,
    register,
    onChange,
    className,
  } = props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }

  return (
    <div>
      <FormControl error={showError} fullWidth>
        <Select
          native
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
          label={placeholder}
          defaultValue=""
          placeholder={placeholder}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <p className="placeholder-select">{placeholder}</p>;
            }
            return selected;
          }}
        >
          <option aria-label="none" value="" />
          {options.map(
            (option: {
              child: { label: any; value: any }[];
              label: any;
              value: any;
            }) =>
              option.child ? (
                <optgroup label={option.label} className="optgroupSelect">
                  {option.child.map((childData: { label: any; value: any }) => (
                    <option
                      label={childData.label}
                      className="optionSelect"
                      value={childData.value}
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

export default SelectGroup;
