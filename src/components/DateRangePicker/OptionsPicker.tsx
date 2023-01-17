import React, { useState, useRef } from 'react';
import Popover from '@mui/material/Popover';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';
import Button from '@mui/material/Button';
import { isDate, format } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import './calendar.css';
import { IcCalendar } from '../../assets/icons';
import ButtonForm from './ButtonForm'

const Wrapper = styled.div({
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
});

const DisplayBox = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  border: '1px solid #ACACAC',
  borderRadius: '3px',
  flex: 1,
  justifyContent: 'space-between',
});

export interface OptionsPickerProps {
}
export default function OptionsPicker(props: OptionsPickerProps) {
  const {  } = props;
  const [openFromDatePopup, setFromDatePopup] = useState(false);
  const [openToDatePopup, setToDatePopup] = useState(false);
  const dateDisplayBoxRef = useRef(null);
  const { reset } = useFormContext();

  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());

  const handleChangeFromDate = (value: any) => {
    setStartDay(value);
    setFromDatePopup(false);
  };

  const handleChangeToDate = (value: any) => {
    setEndDay(value);
    setToDatePopup(false);
  };

  const handleSubmitDate = () => {
    reset({
      from: startDay,
      to: endDay,
    });
  };

  return (
    <>
      <Wrapper ref={dateDisplayBoxRef}>
        <DisplayBox onClick={() => setFromDatePopup((prev) => !prev)}>
          <span>{format(startDay, 'dd/MM/yyyy')}</span>
          <IcCalendar />
        </DisplayBox>
        <DisplayBox onClick={() => setToDatePopup((prev) => !prev)}>
          <span>{format(endDay, 'dd/MM/yyyy')}</span>
          <IcCalendar />
        </DisplayBox>
      </Wrapper>

      <div style={{marginTop: '10px'}}>
        <ButtonForm 
            onClick={handleSubmitDate} 
            className='ButtonFormFilter'
        >
          Lọc
        </ButtonForm>
      </div>

      <Popover
        open={openFromDatePopup}
        anchorEl={dateDisplayBoxRef.current}
        onClose={() => setFromDatePopup(false)}
        elevation={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ padding: '0 10px' }}
      >
        <Calendar
          value={startDay}
          onChange={(value: any) => handleChangeFromDate(value)}
        />
      </Popover>

      <Popover
        open={openToDatePopup}
        anchorEl={dateDisplayBoxRef.current}
        onClose={() => setToDatePopup(false)}
        elevation={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ padding: '0 10px' }}
      >
        {isDate(startDay) ? (
          <Calendar
            value={endDay}
            minDate={startDay}
            onChange={(value: any) => handleChangeToDate(value)}
          />
        ) : null}
        {!isDate(startDay) ? (
          <Calendar onChange={(value: any) => handleChangeToDate(value)} />
        ) : null}
      </Popover>
    </>
  );
}
