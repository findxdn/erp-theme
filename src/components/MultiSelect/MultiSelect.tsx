import * as React from "react";
import { Chip } from "@mui/material";
import CancelIcon from "@material-ui/icons/Cancel";
import { Box } from "@mui/system";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import _ from "lodash";
import MessageError from "../../utils/MessageError";
import { Tooltip } from '@mui/material';
import { makeStyles } from "@mui/styles";

export interface MultiSelectProps {
  name: string;
  placeholder?: string;
  value?: any;
  onChange?: any;
  register?: any;
  errors?: any;
  options?: any;
  className?: any;
  disabled?: any;
  isTooltip?: any;
  _props?: any;
}
const MenuProps = {
  PaperProps: {
    style: {
      color: "black",
    },
  },
};

function MultiSelect(props: MultiSelectProps) {
  const {
    options,
    errors = null,
    name,
    register,
    onChange,
    className,
    placeholder = "",
    value = [],
    disabled = false,
    isTooltip = false,
  } = props;

  let showError = false;
  let error = null;
  let arr = [];
  if (name && errors !== null) {
    arr = name.split(".");
    if (arr.length >= 1) {
      let result = arr.reduce((rs, e) => {
        if (rs[e]) {
          return (rs = rs[e]);
        }
        return {};
      }, errors);
      error = result;
      showError = !_.isEmpty(error);
    }
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
        <Tooltip
          placement="bottom"
          arrow
          classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
          title={(error?.message && isTooltip) ? (
            <MessageError
              type={error?.type}
              message={error?.message}
              style={{ color: "red", marginTop: "0px" }} />
          ) : ""}>
          <Select
            {...register}
            {...props._props}
            name={name}
            sx={style}
            IconComponent={ExpandMoreSharpIcon}
            fullWidth
            displayEmpty
            value={value}
            disabled={disabled}
            onChange={onChange}
            multiple
            className={className}
            input={<OutlinedInput />}
            renderValue={(selected: any) => {
              console.log(selected)
              if (Array.isArray(selected) && selected.length > 0) {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected?.map((values: any) => {
                      const dataChange = options.find(
                        (x: any) => x.value == values
                      );
                      return (
                        <Chip
                          sx={{ borderRadius: "3px", height: "24px" }}
                          key={dataChange?.value}
                          label={dataChange?.label}
                          clickable
                          onDelete={(e) => {
                            props.onChange(value.filter((e: any) => e !== values));
                          }}
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                            />
                          }
                        />
                      );
                    })}
                  </Box>
                );
              }
              return <p className="placeholder-select" style={{ fontSize: 14, color: '#a9a9a9' }}>{placeholder}</p>;
            }}
            MenuProps={MenuProps}
          >
            {options.map((option: { value: any; label: any }) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
        {(error?.message && !isTooltip) && (
          <MessageError type={error?.type} message={error?.message} />
        )}
      </FormControl>
    </div>
  );
}

export default MultiSelect;