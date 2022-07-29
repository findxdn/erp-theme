/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { format } from 'date-fns';
import moment from 'moment';
import TextInput from './TextInput';
// COMPONENTS
// MUIS
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
// MUI ICONS
import CustomDateRangeTimePicker from './CustomDateRangeTimePicker';

export interface CustomDateRangeAndTimePickerProps {
  value: any;
  onChange?: any;
  errors?: any;
  name?: any;
  placeholder?: any;
  isWithTimePicker?: any;
}

const CustomDateRangeAndTimePicker = (props: CustomDateRangeAndTimePickerProps) => {
  const {
    value,
    onChange,
    errors,
    name,
    placeholder,
    isWithTimePicker = false,
  } = props;
  const getThisWeekDateAndTime = () => [moment().startOf('day').toDate(), moment().endOf('day').toDate()];

  const [anchorEl, setAnchorEl] = useState(null);

  const formatDateRangeAndTimeText = (inputDateRangeAndTime: any) => {
    if (inputDateRangeAndTime?.length <= 1) {
      return ''
    }
    const formatedDateRange = `${format(
      new Date(inputDateRangeAndTime[0]),
      'MM/dd/yyyy HH:mm aa',
    )} - ${format(new Date(inputDateRangeAndTime[1]), 'MM/dd/yyyy HH:mm aa')}`;
    return formatedDateRange;
  };

  const handleSelect1Click = (inputNewDateRange: any) => {
    onChange(inputNewDateRange)
    setAnchorEl(null);
  }

  return (
    <Box>
      <Box
        onClick={(event: any) => setAnchorEl(event?.currentTarget)}
        style={{ marginBottom: '20px' }}
      >
        <TextInput
          value={(value != null && typeof value !== 'undefined' && value != '') ? formatDateRangeAndTimeText(value) : ''}
          onChange={() => { }}
          errors={errors}
          name={name}
          placeholder={placeholder}
          _inputProps={undefined}
        />
      </Box>
      {/* DATE RANGE AND TIME PICKER */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <CustomDateRangeTimePicker
          value={value ?? getThisWeekDateAndTime()}
          handleSelectButtonClick={handleSelect1Click}
          handleCancelButtonClick={() => setAnchorEl(null)} 
          isWithTimePicker={isWithTimePicker} />
      </Menu>
    </Box>
  )
}

export default CustomDateRangeAndTimePicker
