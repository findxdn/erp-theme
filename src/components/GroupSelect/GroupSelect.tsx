import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@mui/styles";
import { Tooltip } from '@mui/material';
import IconDropDownForm from '../../assets/icons/system/ic-drop-down-form'
import MessageError from "../../utils/MessageError";
import _ from 'lodash';
import Box from '@mui/material/Box';

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
    noOptionsText = 'Không có dữ liệu',
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
      },
      noOptions: {
        fontSize: 14,
        padding: '10px 12px !important',
      },
    },
  }));

  let classes = useStyles();

  return (
    <>
      <Autocomplete
        {...props._props}
        noOptionsText={noOptionsText}
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
        isOptionEqualToValue={(option, value) => option.key === value.key}
        defaultValue={defaultValue}
        options={options}
        groupBy={(option) => option.ParentName}
        getOptionLabel={(option) => option.label}
        classes={{
          noOptions: classes.noOptions,
        }}
        sx={{ width: 300 }}
        popupIcon={<IconDropDownForm />}
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
        renderOption={(props, option) => (
          <Box
            key={option.key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 }, fontSize: '14px', padding: '6px 12px !important' }}
          >
            <div
              className="bases__margin-left--15"
              role="button"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '2px solid #fafafa',
              }}
              {...props}
            >
              <p className="bases__font--14 w-100">{option.label}</p>
            </div>
          </Box>
        )}
      />
      {(error?.message && !isTooltip) && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </>
  );
})

export default GroupSelect;
