import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import Popover from "@mui/material/Popover";
import { isDate, format, subWeeks } from "date-fns";
import DateOptions from "./DateOptions";
import { IcCalendar } from "../../assets/icons";

export interface DateDisplayBoxWrapperProps {
  isOpen: any;
  disabled: any;
}
const DateDisplayBoxWrapper = styled.div(
  (props: DateDisplayBoxWrapperProps) => ({
    border: "1px solid",
    borderRadius: "3px",
    borderColor: props.isOpen ? "#138300" : "#d8d7d7",
    color: props.isOpen ? "#138300" : "inherit",
    padding: "3px 10px",
    cursor: props?.disabled ? 'default' : "pointer",
    backgroundColor: props?.disabled ? '#E3E3E3' : "unset",
    display: "flex",
    height: "32px",
    overflow: "hidden",
    "&:focus, &:hover": {
      borderColor: "#138300",
      color: "#138300",
    },
    justifyContent: "space-between",
    pointerEvents: props?.disabled ? 'none' : 'fill'
  })
);

const DateText = styled.div({
  color: "black",
});

export interface RangeDateProps {
  dateValue: any;
  ref?: any;
  placeholder?: any;
}
const RangeDate = (props: RangeDateProps) => {
  const { dateValue = [], placeholder = "dd/MM/yyyy - dd/MM/yyyy", ref } = props;
  let fromDate = placeholder;
  if (dateValue[0]) {
    fromDate = isDate(dateValue[0])
      ? format(dateValue[0], "dd/MM/yyyy")
      : format(Date.parse(dateValue[0]), "dd/MM/yyyy");
  } else {
    fromDate = placeholder;
  }
  let toDate = placeholder;
  if (dateValue[1]) {
    toDate = isDate(dateValue[1])
      ? format(dateValue[1], "dd/MM/yyyy")
      : format(Date.parse(dateValue[1]), "dd/MM/yyyy");
  } else {
    toDate = placeholder;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingRight: "4px",
        color: fromDate == placeholder ? "#c7c7c7" : "#333",
      }}
    >
      {dateValue.length == 0 ? (
        <div>{placeholder}</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: fromDate == placeholder ? "#c7c7c7" : "#333",
            }}
          >
            {fromDate}
          </div>
          <span
            style={{
              margin: "0 10px",
              color: fromDate == placeholder ? "#c7c7c7" : "#333",
            }}
          >
            -
          </span>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: toDate == placeholder ? "#c7c7c7" : "#333",
            }}
          >
            {toDate}
          </div>
        </div>
      )}
    </div>
  );
};
export interface DateDisplayBoxProps {
  name?: any;
  ref?: any;
  placeholder?: any;
  value?: any;
  onChange?: any;
  disabled?: any;
}
const DateDisplayBox = (props: DateDisplayBoxProps) => {
  const { ref, placeholder , value, onChange, disabled} = props;
  const [isOpen, setIsOpen] = useState(false);
  const dateDisplayBoxRef = useRef(null);

  const toggleDatePicker = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e: any) =>{
    onChange([e?.from, e?.to]);
    setIsOpen(false)
  }

  useEffect(() => {}, []);
  return (
    <>
    <DateDisplayBoxWrapper
        ref={dateDisplayBoxRef}
        onClick={toggleDatePicker}
        isOpen={isOpen}
        disabled={disabled}
        className="DateDisplayBoxWrapper"
      >
        <RangeDate dateValue={value} placeholder={placeholder} />
        <IcCalendar />
      </DateDisplayBoxWrapper>

      <Popover
        open={isOpen}
        anchorEl={dateDisplayBoxRef.current}
        onClose={() => setIsOpen(false)}
        elevation={2}
        anchorOrigin={{
          vertical:
            dateDisplayBoxRef.current !== null
              ? dateDisplayBoxRef.current["offsetHeight"] + 10
              : 10,
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <DateOptions value={value} onChange={handleChange} ref={ref} />
      </Popover>
    </>
  );
};

export interface DateRangePickerProps {
  onChange?: any;
  placeholder?: any;
  name?: any;
  value?: any;
  disabled?: any;
}
export default function CustomDateRangerPicker(props: DateRangePickerProps) {
  const { name, placeholder, value , onChange, disabled = false} = props;

  return (
    <div>
      <DateDisplayBox name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}
