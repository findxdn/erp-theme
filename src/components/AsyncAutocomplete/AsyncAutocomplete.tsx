/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Tooltip } from '@mui/material';
import _ from "lodash";
import MessageError from "../../utils/MessageError";
import Box from '@mui/material/Box';
import { IcAdd } from "../../assets/icons";
import IconDropDownForm from '../../assets/icons/system/ic-drop-down-form'
import { makeStyles } from "@mui/styles";

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
const AsyncAutocomplete = React.forwardRef((props: AsyncAutocompleteProps, ref) => {
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
    noOptions: {
      fontSize: 14,
      padding: '10px 12px !important',
    },
  }));

  const [inputValue, setInputValue] = React.useState("");
  const [label, setLabel] = React.useState('');

  const onChangeTextField = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    if (onChangeInput !== null) { onChangeInput(e?.target?.value) }
    setInputValue(e?.target?.value)
  }

  const option = options.find((x: any) => x.key == value)

  useEffect(() => {
    if (value !== null && typeof value !== 'undefined' && inputValue !== label) {
      onChange(null)
    }
  }, [options])

  useEffect(() => {
    if (value?.key !== null && typeof value?.key !== 'undefined' && inputValue !== value?.label) {
      onChange(value?.key)
      onChangeInput(value?.label)
      setInputValue(value?.label)
      setLabel(value?.label)
    }
    if (value?.key === '' && value?.label === '') {
      onChange(null)
    }
  }, [value])

  let classes = useStyles();

  return (
    <>
      <Autocomplete
        {...props._props}
        noOptionsText={noOptionsText}
        value={
          options.find((x: any) => (x.key == value?.key && value?.key !== '' && typeof value?.key !== 'undefined')
          || (x.key == value && value !== '' && typeof value !== 'undefined')) ?? null
        }
        onChange={(e, newValue: any) => {
          if (newValue && newValue.key !== -1) {
            onChange(newValue.key)
            setLabel(newValue?.label)
            setInputValue(newValue?.label)
          } else {
            onChange(null)
            setInputValue('')
            setLabel('')
            onChangeInput('')
          }
        }}
        filterOptions={(options, state) => options}
        isOptionEqualToValue={(option, value) => option.key === value.key}
        // autoSelect={true}
        inputValue={inputValue}
        disabled={disabled}
        className={className}
        defaultValue={defaultValue}
        options={options}
        popupIcon={<IconDropDownForm />}
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
                    <p className="bases__margin-left--15 bases__font--14">{option?.label}</p>
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
                    <p className="bases__font--14 w-100">{option.label}</p>
                  </div>
                )
            }
          </Box>
        )}
        classes={{
          noOptions: classes.noOptions,
        }}
      />
      {(error?.message && !isTooltip) && (
        <MessageError type={error?.type} message={error?.message} />
      )}
    </>
  );
})

export default AsyncAutocomplete;
