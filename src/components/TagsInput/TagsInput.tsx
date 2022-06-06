import React, { useEffect, useRef } from 'react';
import Chip from '@mui/material/Chip';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Downshift from 'downshift';
import './TagsInput.scss'

export interface TagsInputProps {
  name: string;
  placeholder?: any;
  ref?: any;
  value?: any;
  onChange?: any;
  disabled?: any;
  onBlur?: any;
  errors?: any;
  defaultValue?: any;
  type?: any;
  isPassword?: any;
  className?: string;
  isTooltip?: any;
  readOnly?: any;
  _props?: any;
  textAlign?: any;
}


const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25),
    height: '22px',
  },
}));

const TagsInput = (props: TagsInputProps) => {
  const classes = useStyles();
  const { 
    placeholder,
    onChange, 
    value, 
  } = props;
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState(value || []);

  function handleKeyDown(event) {
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
    width: '40%',
    fontSize: 14,
    color: '#333333',
    zIndex: '1',
    height: '32px',
    '& .MuiInputBase-input': {
      padding: '0px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px',
      fontSize: 14,
      padding: '0px 10px',
      color: '#333333',
      zIndex: '1',
      backgroundColor: '#ffffff',
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #d8d7d7',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #138300',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #138300',
      },
    },
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

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
              <TextField
                sx={style}
                InputProps={{
                  startAdornment: (
                    <div className="tagsInput-chip">
                      {(value !== null && Array.isArray(value)) ? value.map((item) => (
                        <Chip
                          key={item}
                          tabIndex={-1}
                          style={{
                            display: 'inline',
                            height: '24px',
                            padding: '2px',
                          }}
                          label={item}
                          className={classes.chip}
                          onDelete={handleDelete(item)}
                        />
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                      )) : <></>}
                    </div>
                  ),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                  },
                  onFocus,
                }}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}

export default TagsInput
