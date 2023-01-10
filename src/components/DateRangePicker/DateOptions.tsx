import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  subDays,
  subWeeks,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subYears,
} from 'date-fns';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useFormContext } from 'react-hook-form';
import ButtonForm from './ButtonForm';
import OptionsPicker from "./OptionsPicker";

const DateOptionsWrapper = styled.div((props) => ({
  padding: '10px',
  maxWidth: '350px',
}));

const date = new Date();

export interface ExpandSectionProps {
  isExpand?: any;
}

const ExpandSection = styled.div((props: ExpandSectionProps) => ({
  display: props.isExpand ? 'block' : 'none',
}));

const dateOptionsArray = [
  { title: 'Hôm nay', value: { from: date, to: date } },
  { title: 'Hôm qua', value: { from: subDays(date, 1), to: subDays(date, 1) } },
  { title: '7 ngày qua', value: { from: subWeeks(date, 1), to: date } },
  { title: '30 ngày qua', value: { from: subDays(date, 30), to: date } },
  {
    title: 'Tháng trước',
    value: {
      from: startOfMonth(subMonths(date, 1)),
      to: endOfMonth(subMonths(date, 1)),
    },
  },
  {
    title: 'Tháng này',
    value: { from: startOfMonth(date), to: endOfMonth(date) },
  },
  // {
  //   title: 'Năm trước',
  //   value: {
  //     from: startOfYear(subYears(date, 1)),
  //     to: endOfYear(subYears(date, 1)),
  //   },
  // },
  // { title: 'Năm nay', value: { from: startOfYear(date), to: endOfYear(date) } },
];

export interface DateOptionsProps {
  ref?: any;
}
function DateOptions(props: DateOptionsProps) {
  const { ref } = props;
  const { reset } = useFormContext();
  const changeDate = (value: any) => {
    reset(value);
    
  };
  const [isExpand, setIsExpand] = useState(false);

  return (
    <DateOptionsWrapper>
      <Grid container spacing={1}>
        {dateOptionsArray.map((options: { value: any, title: any } ) => (
          <Grid item xs={6}>
            <ButtonForm
              onClick={() => changeDate(options.value)}
            >
              {options.title}
            </ButtonForm>
          </Grid>
        ))}
        <Grid item xs={12}>
          <ButtonForm
            onClick={() => setIsExpand(true)}
            className='ButtonFormEdit'
          >
            Tùy chọn
          </ButtonForm>
          <ExpandSection isExpand={isExpand}>
            <OptionsPicker />
          </ExpandSection>
        </Grid>
      </Grid>
    </DateOptionsWrapper>
  );
}

export default DateOptions;
