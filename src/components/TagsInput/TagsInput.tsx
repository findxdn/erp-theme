/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import Downshift from 'downshift';
import { Tooltip } from '@mui/material';
import MessageError from "../../utils/MessageError";
import _ from "lodash";

export interface TagsInputProps {
  name: string;
  className?: string;
  placeholder?: any;
  onChange?: any;
  errors?: any;
  styles?: any;
  defaultValue?: any;
  ref?: any;
  value?: any;
  isTooltip?: any;
  readOnly?: any;
}

export default function TagsInput(props: TagsInputProps) {
  const {
    placeholder,
    onChange,
    value,
    errors = null,
    isTooltip = false,
    name,
    readOnly = false,
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

  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(value || []);

  function handleKeyDown(event) {
    if (value === null || !Array.isArray(value)) {
      setSelectedItem([])
    }
    if (event.key === 'Tab') {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim(),
      );
      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }
      if (!event.target.value.replace(/\s/g, '').length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue('');
      event.preventDefault()
      if (onChange) {
        onChange(newSelectedItem)
      }
    }
    if (
      selectedItem.length
      && !inputValue.length
      && event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
      onChange(selectedItem.slice(0, selectedItem.length - 1))
    }
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    onChange(newSelectedItem);
  };

  const style = {
    width: '100%',
    fontSize: 14,
    color: '#333333',
    zIndex: '1',
    '& .MuiInputBase-input': {
      padding: '0px',
      minWidth: '60px',
      flex: 1,
    },
    '& .MuiOutlinedInput-root': {
      flexWrap: 'wrap',
      minHeight: '32px',
      borderRadius: '5px',
      fontSize: 14,
      padding: '0px 10px',
      color: '#333333',
      zIndex: '1',
      backgroundColor: `${readOnly ? '#e2e4e7' : '#ffffff'}`,
      '& .MuiOutlinedInput-notchedOutline': {
        border: `${readOnly ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#d8d7d7'}`,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: `${readOnly ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `${readOnly ? '0px' : '1px'} solid ${(showError) ? '#FF0000' : '#138300'}`,
      },
    },
  };

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  const [showIcRight, setShowIcRight] = React.useState(true);

  const handleOnclickIconRight = () => {
    setShowIcRight(!showIcRight);
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
    chip: {
      margin: theme.spacing(0.5, 0.25),
      height: '22px',
    },
  }));

  let classes = useStyles();

  return (
    <div>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        selectedItem={props?.value}
      >
        {({ getInputProps }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
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
                  sx={style}
                  id="outlined-textarea"
                  multiline
                  fullWidth
                  InputProps={{
                    readOnly: readOnly,
                    startAdornment: (
                      (value !== null && Array.isArray(value)) ? value.map((item) => (
                        <Chip
                          key={item}
                          tabIndex={-1}
                          style={{
                            alignItems: 'center',
                            height: '24px',
                          }}
                          label={item}
                          className={classes.chip}
                          onDelete={handleDelete(item)}
                        />
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                      )) : <></>
                    ),
                    onBlur,
                    onChange: (event) => {
                      handleInputChange(event);
                    },
                    onFocus,
                  }}
                  {...inputProps}
                />
              </Tooltip>
              {
                (error?.message && !isTooltip) ? (
                  <MessageError type={error?.type} message={error?.message} />
                ) : <></>
              }
            </div>
          );
        }}
      </Downshift >
    </div >
  );
}
