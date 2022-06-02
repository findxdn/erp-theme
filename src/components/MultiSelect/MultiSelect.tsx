import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import { Chip } from "@mui/material";
import CancelIcon from "@material-ui/icons/Cancel";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from "@mui/system";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import _ from "lodash";
import MessageError from "../../utils/MessageError";

export interface MultiSelectProps {
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
      color: "black",
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
    border: `1px solid #138300`,
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottom: `1px solid #138300`,
  },
  "&:after": {
    borderBottom: `1px solid #138300`,
  },
};

function getStyles(
  option: { value: React.Key | null | undefined; label: {} | null | undefined },
  personName: string | any[],
  theme: Theme
) {
  return {
    fontWeight:
      personName.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultiSelect(props: MultiSelectProps) {
  const { options,
    errors,
    name,
    register,
    onChange,
    className,
    placeholder = '',
    value = [] } = props;
  let showError = false;
  if (!_.isEmpty(errors)) {
    showError = !_.isEmpty(errors[name]);
  }
  const theme = useTheme();
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
          value={value}
          onChange={onChange}
          multiple
          className={className}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            console.log(selected)
            if (Array.isArray(selected)) {
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected?.map((values: any) => {
                    const dataChange = options.find((x: any) => x.value == values);
                    return (
                      <Chip
                        sx={{ borderRadius: "5px", height: "24px" }}
                        key={dataChange?.values}
                        label={dataChange?.label}
                        clickable
                        onDelete={(e) => {
                          props.onChange(value.filter((item) => item !== values))
                        }}
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={(e) => {
                              e.stopPropagation();
                            }}
                          />
                        }
                      />
                    )
                  })}
                </Box>
              )
            }
            return <p className="placeholder-select">{placeholder}</p>
          }}
          MenuProps={MenuProps}
        >
          {options.map((option: { value: any; label: any }) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
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

export default MultiSelect;
