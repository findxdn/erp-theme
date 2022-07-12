/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import { Tooltip } from '@mui/material';
import _ from "lodash";
import MessageError from "../../utils/MessageError";
import { makeStyles, Box } from "@material-ui/core";
import { IcAdd } from "../../assets/icons";

export interface AsyncAutocompleteProps {
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
  handleAdd?: any;
  onChangeInput?: any;
  noOptionsText?: any;
}

function AsyncAutocomplete(props: AsyncAutocompleteProps) {
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
    ref,
    isTooltip = false,
    inputRef,
    onChangeInput = null,
    isSearchOpitons = false,
    handleAdd = null,
    noOptionsText = 'Không tìm thấy',
  } = props;

  let showError = false;
  let error: any
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
  }));

  const [inputValue, setInputValue] = React.useState("");

  const onChangeTextField = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    if (onChangeInput !== null)
      props?.onChangeInput(e?.target?.value)
    setInputValue(e?.target?.value)
  }

  const option = options.find((x: any) => x.key == value)

  useEffect(() => {
    const option = options.find((x: any) => x.key == value)
    if (options.length === 0 && onChangeInput !== null && inputValue !== '') {
      props?.onChangeInput()
      onChange(null)
      setInputValue(inputValue)
    }
    else if (options.length !== 0 && onChangeInput !== null && inputValue !== '' && value !== null && typeof value !== 'undefined') {
      if (option != null && typeof option !== 'undefined' && inputValue !== option?.label) {
        onChange(null)
        props?.onChangeInput(inputValue)
      } else if (option != null || typeof option !== 'undefined') {
        onChange(value)
        setInputValue(option?.label)
      } else {
        props?.onChangeInput()
        onChange(value)
        setInputValue(inputValue)
      }
    } else if (inputValue === '' && (value !== null || typeof value !== 'undefined')) {
      if (typeof option !== 'undefined') {
        onChange(null)
        props?.onChangeInput(inputValue)
        setInputValue(inputValue)
      }
    }
  }, [options])

  useEffect(() => {
    if (option !== null && typeof option !== 'undefined' && inputValue === '') {
      setInputValue(option ? option.label : '')
    }
  }, [option])
  let classes = useStyles();
  return (
    <>
      <Autocomplete
        {...props._props}
        noOptionsText={noOptionsText}
        value={options.find((x: any) => x.key == value) ?? null}
        onChange={(e, newValue: any) => {
          if (newValue && newValue.key !== -1) {
            onChange(newValue.key)
            setInputValue(newValue?.label)
          } else {
            onChange(null)
            setInputValue('')
          }
        }}
        filterOptions={(options, state) => options}
        autoSelect={true}
        inputValue={inputValue}
        disabled={disabled}
        className={className}
        defaultValue={defaultValue}
        options={options}
        popupIcon={<ExpandMoreSharpIcon />}
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
            onClick={() => { if (option.key === -1) handleAdd() }}
          >
            {
              option?.key === -1
                ? (
                  <div
                    className="bases__margin-left--15"
                    role="button"
                    style={{
                      borderBottom: '2px solid #fafafa',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: '40px',
                    }}
                    {...props}
                  >
                    <IcAdd />
                    <p className="bases__margin-left--15">{option?.label}</p>
                  </div>
                )
                : (
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
                    <p style={{ width: '100%' }}>{option.label}</p>
                  </div>
                )
            }
          </Box>
        )}
      />
      {(error?.message && !isTooltip) && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </>
  );
}

export default AsyncAutocomplete;
