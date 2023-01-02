import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Popover from '@mui/material/Popover';
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from 'react-hook-form';
import { isDate, format, subWeeks } from 'date-fns';
import DateOptions from './DateOptions';
import { IcCalendar } from '../../assets/icons';

const DateRangePickerWrapper = styled.div({});

export interface DateDisplayBoxWrapperProps {
  isOpen: any;
}
const DateDisplayBoxWrapper = styled.div((props: DateDisplayBoxWrapperProps) => ({
  border: '1px solid',
  borderRadius: '3px',
  borderColor: props.isOpen ? '#138300' : '#d8d7d7',
  color: props.isOpen ? '#138300' : 'inherit',
  padding: '3px 10px',
  cursor: 'pointer',
  display: 'flex',
  height: '32px',
  overflow: 'hidden',
  '&:focus, &:hover': {
    borderColor: '#138300',
    color: '#138300',
  },
  justifyContent: 'space-between',
}));

const DateText = styled.div({
  color: 'black',
});

export interface RangeDateProps {
  dateValue: any;
}
const RangeDate = (props: RangeDateProps) => {
  const { dateValue } = props
  const fromDate = isDate(dateValue[0])
    ? format(dateValue[0], 'dd/MM/yyyy')
    : format(Date.parse(dateValue[0]), 'dd/MM/yyyy');

  const toDate = isDate(dateValue[1])
    ? format(dateValue[1], 'dd/MM/yyyy')
    : format(Date.parse(dateValue[1]), 'dd/MM/yyyy');

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <DateText>{fromDate}</DateText>
      <span style={{ margin: '0 10px' }}>-</span>
      <DateText>{toDate}</DateText>
    </div>
  );
};
export interface DateDisplayBoxProps {
  fieldName: any;
}
const DateDisplayBox = (props: DateDisplayBoxProps) => {
  // const { } = props;
  const { control } = useFormContext();
  const { field } = useController({ control, name: props.fieldName });
  const [isOpen, setIsOpen] = useState(false);
  const dateDisplayBoxRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      from: field?.value,
      to: field?.value,
    },
  });

  const { watch, getValues } = methods;

  useEffect(() => {
    const subscription = watch(() => {
      const { from, to } = getValues();
      setIsOpen(false);
      field.onChange([from, to]);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };
  

  useEffect(() => {
  }, [])
  return (
    <FormProvider {...methods}>
      <DateDisplayBoxWrapper
        ref={dateDisplayBoxRef}
        onClick={toggleDatePicker}
        isOpen={isOpen}
      >
        <RangeDate dateValue={field.value} />
        <IcCalendar />
      </DateDisplayBoxWrapper>

      <Popover
        open={isOpen}
        anchorEl={dateDisplayBoxRef.current}
        onClose={() => setIsOpen(false)}
        elevation={2}
        anchorOrigin={{
          vertical: dateDisplayBoxRef.current !== null ? dateDisplayBoxRef.current['offsetHeight'] + 10 : 10,
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <DateOptions handleClose={toggleDatePicker} />
      </Popover>
    </FormProvider>
  );
};

export interface DateRangePickerProps {
  fieldName: any;
}
export default function DateRangePicker(props: DateRangePickerProps) {
  const { fieldName } = props;

  return (
    <DateRangePickerWrapper>
      <DateDisplayBox fieldName={fieldName} />
    </DateRangePickerWrapper>
  );
}
