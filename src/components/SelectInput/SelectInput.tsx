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
  ".MuiSelect-select": {
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
    border: `2px solid #138300`,
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottom: `1px solid #138300`,
  },
  "&:after": {
    borderBottom: `1px solid #138300`,
  },
};

function SelectInput(props: SelectInputProps) {
  const { options, placeholder, errors, name, register, onChange, className } =
    props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [keyValue, setKeyValue] = React.useState([]);

  const handleChange = (event: { target: { value: any } }) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value.label === "string" ? value.label.split(",") : value.label
    );
    onChange(value);
  };

  return (
    <div>
      <FormControl error={showError} fullWidth>
        <Select
          {...register}
          name={name}
          sx={style}
          IconComponent={ExpandMoreSharpIcon}
          fullWidth
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          className={className}
          placeholder={placeholder}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <p className="placeholder-select">{placeholder}</p>;
            }
            console.log(selected);
            return selected;
          }}
        >
          {options.map((option: { value: any; label: any }) => (
            <MenuItem key={option.value} value={option}>
              {option.label}
            </MenuItem>
          ))}
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
