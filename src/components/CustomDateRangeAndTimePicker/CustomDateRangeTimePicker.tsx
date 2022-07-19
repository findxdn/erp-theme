import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// MUI LABS
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
// import { DatePicker } from '@material-ui/pickers';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { dateRangeList, timeOptionList } from './customDateRangeAndTimeData';
// STYLES
import useStyles from './customDateRangeAndTimePickerUseStyles';


export interface CustomDateRangeAndTimePickerProps {
  value?: any;
  dateFormat?: any;
  timeFormat?: any;
  isWithTimePicker: any;
  handleSelectButtonClick?: any;
  handleCancelButtonClick?: any;
}

const CustomDateRangeAndTimePicker = (props: CustomDateRangeAndTimePickerProps) => {
  const {
    value,
    dateFormat,
    timeFormat,
    isWithTimePicker,
    handleSelectButtonClick,
    handleCancelButtonClick,
  } = props;

  const classes = useStyles();

  const initialStartDateInput = value && value[0] ? moment(value[0]).format(dateFormat) : '';
  const initialStartTimeInput = value && value[0] ? moment(value[0]).format(timeFormat) : '';
  const initialEndDateInput = value && value[0] ? moment(value[1]).format(dateFormat) : '';
  const initialEndTimeInput = value && value[0] ? moment(value[1]).format(timeFormat) : '';

  const [tempValue, setTempValue] = useState(value || [null, null]);
  const [startDateInput, setStartDateInput] = useState(initialStartDateInput);
  const [startTimeInput, setStartTimeInput] = useState(initialStartTimeInput);
  const [endDateInput, setEndDateInput] = useState(initialEndDateInput);
  const [endTimeInput, setEndTimeInput] = useState(initialEndTimeInput);
  const [selectedDateRangeItem, setSelectedDateRangeItem] = useState(1);
  const [countDays, setCountDays] = useState(0);
  const [key, setKey] = useState(0);

  const getSelectedDays = () => {
    if (countDays) {
      if (countDays === 1) return 'Đã chọn 1 ngày';
      return `Đã chọn ${countDays} ngày`;
    } return 'Đã chọn 0 ngày';
  };

  const handleDateRangePickerChange = (inputNewValue: any) => {
    setTempValue(inputNewValue);

    setStartDateInput(moment(inputNewValue[0]).format(dateFormat));
    setStartTimeInput(moment(inputNewValue[0]).format(timeFormat));
    setEndDateInput(moment(inputNewValue[1]).format(dateFormat));
    setEndTimeInput(moment(inputNewValue[1]).format(timeFormat));
  };

  const handleDateRangeItemClick = (inputItem: any) => {
    let startDate;
    let endDate;

    if (inputItem.label === 'Hôm nay') {
      startDate = moment().startOf('day').toDate();
      endDate = moment().endOf('day').toDate();
    } else if (inputItem.label === '7 ngày trước') {
      startDate = moment().subtract(6, 'day').startOf('day').toDate();
      endDate = moment().endOf('date').toDate();
    } else if (inputItem.label === 'Tháng này') {
      startDate = moment().startOf('months').toDate();
      endDate = moment().endOf('date').toDate();
    } else if (inputItem.label === 'Tháng trước') {
      startDate = moment().subtract(1, 'months').startOf('months').toDate();
      endDate = moment().subtract(1, 'months').endOf('months').toDate();
    } else if (inputItem.label === 'Tùy chọn') {
      startDate = moment().subtract(1, 'day').startOf('day').toDate();
      endDate = moment().endOf('day').toDate();
    }

    setSelectedDateRangeItem(inputItem.key);
    setTempValue([startDate, endDate]);

    setStartDateInput(moment(startDate).format(dateFormat));
    setStartTimeInput(moment(startDate).format(timeFormat));
    setEndDateInput(moment(endDate).format(dateFormat));
    setEndTimeInput(moment(endDate).format(timeFormat));

    setKey((current) => current + 1);
  };

  const onStartDateInputChange = (inputValue: any) => {
    setSelectedDateRangeItem(-1);
    setStartDateInput(inputValue);

    if (moment(inputValue, dateFormat, true).isValid()) {
      setTempValue((current: any) => [moment(inputValue).toDate(), current[1]]);
    }

    setKey((current) => current + 1);
  };

  const onStartTimeInputChange = (inputValue: any) => {
    setSelectedDateRangeItem(-1);
    setStartTimeInput(inputValue);

    const inputValueInMoment = moment(inputValue, timeFormat);

    if (moment(inputValue, timeFormat, true).isValid()) {
      setTempValue((current: any) => [
        moment(current[0])
          .set({
            hour: inputValueInMoment.get('hour'),
            minute: inputValueInMoment.get('minute'),
            second: inputValueInMoment.get('second'),
          })
          .toDate(),
        current[1],
      ]);
    }

    setKey((current) => current + 1);
  };

  const onEndDateInputChange = (inputValue: any) => {
    setSelectedDateRangeItem(-1);
    setEndDateInput(inputValue);

    if (moment(inputValue, dateFormat, true).isValid()) {
      setTempValue((current: any) => [current[0], moment(inputValue).toDate()]);
    }

    setKey((current) => current + 1);
  };

  const onEndTimeInputChange = (inputValue: any) => {
    setSelectedDateRangeItem(-1);
    setEndTimeInput(inputValue);

    const inputValueInMoment = moment(inputValue, timeFormat);

    if (moment(inputValue, timeFormat, true).isValid()) {
      setTempValue((current: any) => [
        current[0],
        moment(current[1])
          .set({
            hour: inputValueInMoment.get('hour'),
            minute: inputValueInMoment.get('minute'),
            second: inputValueInMoment.get('second'),
          })
          .toDate(),
      ]);
    }

    setKey((current) => current + 1);
  };

  useEffect(() => {
    setCountDays(moment(tempValue[1]).diff(tempValue[0], 'days') + 1);
  }, [
    tempValue[0],
    tempValue[1],
    startDateInput,
    startTimeInput,
    endDateInput,
    endTimeInput,
  ]);

  return (
    <Box className={classes.root}>
      {/* LEFT PANEL */}
      <Box className={classes.leftPanelContainer}>
        {dateRangeList.map((dateRangeType) => (
          <ListItemButton
            key={dateRangeType.key}
            onClick={() => handleDateRangeItemClick(dateRangeType)}
            className={
              selectedDateRangeItem === dateRangeType.key
                ? `${classes.leftPanelItemButton} ${classes.leftPanelItemButtonActive}`
                : classes.leftPanelItemButton
            }
          >
            <ListItemText
              primary={dateRangeType.label}
              className={classes.leftPanelItemText}
            />
          </ListItemButton>
        ))}
      </Box>

      {/* RIGHT PANEL */}
      <Box className={classes.rightPanelContainer}>
        {/* TITLE */}
        <Typography variant="subtitle2" className={classes.title}>
          Phạm vi ngày  
        </Typography>

        {/* DATE AND TIME PICKERS */}
        {isWithTimePicker && (
          <Box className={classes.dateAndTimeInputContainer}>
            {/* START DATE */}
            <Input
              className={classes.dateAndTimeInput}
              value={startDateInput}
              onChange={(event) => onStartDateInputChange(event.target.value)}
            />

            {/* START TIME */}
            <FormControl
              variant="standard"
              className={classes.dateAndTimeSelect}
            >
              <Select
                value={startTimeInput}
                onChange={(event) => onStartTimeInputChange(event.target.value)}
              >
                {timeOptionList.map((item, index) => (
                  <MenuItem key={index} value={item.time}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* START AND END DATE DIVIDER */}
            <Box className={classes.startAndEndDivider} />

            {/* END DATE */}
            <Input
              className={classes.dateAndTimeInput}
              value={endDateInput}
              onChange={(event) => onEndDateInputChange(event.target.value)}
            />

            {/* END TIME */}
            <FormControl
              variant="standard"
              className={classes.dateAndTimeSelect}
            >
              <Select
                value={endTimeInput}
                onChange={(event) => onEndTimeInputChange(event.target.value)}
              >
                {timeOptionList.map((item, index) => (
                  <MenuItem key={index} value={item.time}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* CALENDAR */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateRangePicker
            key={key}
            className={classes.dateRangePicker}
            displayStaticWrapperAs="desktop"
            value={tempValue}
            onChange={(newValue: any) => handleDateRangePickerChange(newValue)}
            renderInput={(startProps: any, endProps: any) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>

        {/* ACTIONS */}
        <Box className={classes.actionsContainer}>
          {/* COUNT DAYS */}
          <Typography variant="subtitle2" className={classes.countDays}>
            {getSelectedDays()}
          </Typography>

          {/* SELECT BUTTON */}
          <Button
            onClick={() => handleSelectButtonClick(tempValue)}
            className={classes.actionButton}
          >
            Chọn
          </Button>

          {/* CANCEL BUTTON */}
          <Button
            onClick={handleCancelButtonClick}
            className={`${classes.actionButton} ${classes.actionButtonCancel}`}
          >
            Thoát
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomDateRangeAndTimePicker
