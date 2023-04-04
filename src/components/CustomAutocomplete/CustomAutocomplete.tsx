/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import { Tooltip } from '@mui/material';
import _ from "lodash";
import MessageError from "../../utils/MessageError";
import { makeStyles } from "@mui/styles";
import IconDropDownForm from '../../assets/icons/system/ic-drop-down-form'
import Box from '@mui/material/Box';

export interface CustomAutocompleteProps {
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
  popupIcon?: any;
}

const CustomAutocomplete = React.forwardRef((props: CustomAutocompleteProps, ref) => {
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
    inputRef,
    onChangeInput = null,
    isSearchOpitons = false,
    noOptionsText = 'Không có dữ liệu',
    popupIcon = <IconDropDownForm />
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
      width: "100%",
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
    noOptions: {
      fontSize: 14,
      padding: '10px 12px !important',
    },
  }));

  const [inputValue, setInputValue] = React.useState("");

  const onChangeTextField = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    if (onChangeInput !== null)
      props?.onChangeInput(e?.target?.value)
    setInputValue(e?.target?.value)
  }
  const convertViToEn = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }
  let classes = useStyles();
  return (
    <>
      <Autocomplete
        {...props._props}
        noOptionsText={noOptionsText}
        value={options.find((x: any) => x.key == value) ?? null}
        onChange={(e, newValue) => {
          if (newValue) {
            onChange(newValue.key)
          } else {
            onChange(null)
          }
        }}
        filterOptions={(options) =>
          options.filter((option) =>
            isSearchOpitons ? option : convertViToEn(option.label).includes(convertViToEn(inputValue))
          )
        }
        disabled={disabled}
        isOptionEqualToValue={(option, value) => option.key === value.key}
        className={className}
        defaultValue={defaultValue}
        options={options}
        popupIcon={popupIcon}
        classes={{
          noOptions: classes.noOptions,
        }}
        renderInput={(params) => {
          const inputProps = params.inputProps;
          inputProps.autoComplete = "off";
          return (
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
                inputRef={inputRef}
                fullWidth
                onChange={onChangeTextField}
                sx={styleTextField}
                placeholder={placeholder}
                error={showError}
              />
            </Tooltip>
          );
        }}
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

export default CustomAutocomplete;
