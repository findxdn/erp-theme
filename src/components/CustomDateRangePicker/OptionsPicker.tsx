import React, { useState, useRef, useEffect } from "react";
import Popover from "@mui/material/Popover";
import styled from "@emotion/styled";
import Calendar from "react-calendar";
import Button from "@mui/material/Button";
import { isDate, format } from "date-fns";
import "./calendar.css";
import { IcCalendar } from "../../assets/icons";
import ButtonForm from "./ButtonForm";
import classes from "./ButtonForm.module.scss";

const Wrapper = styled.div({
  display: "flex",
  gap: "10px",
  marginTop: "10px",
});

const DisplayBox = styled.div({
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  border: "1px solid #ACACAC",
  borderRadius: "3px",
  flex: 1,
  justifyContent: "space-between",
});

export interface OptionsPickerProps {
  onChange?: any;
  value?: any;
}
export default function OptionsPicker(props: OptionsPickerProps) {
  const { onChange, value } = props;
  const [openFromDatePopup, setFromDatePopup] = useState(false);
  const [openToDatePopup, setToDatePopup] = useState(false);
  const dateDisplayBoxRef = useRef(null);
  const [message, setMessage] = useState(null);
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
    if (new Date(startDay) <= new Date(endDay)) {
      onChange({
        from: startDay,
        to: endDay,
      });
    }
  };

  useEffect(() => {
    if (value) {
      if (value[0]) {
        setStartDay(isDate(value[0]) ? value[0] : new Date(value[0]));
      }
      if (value[1]) {
        setEndDay(isDate(value[1]) ? value[1] : new Date(value[1]));
      }
    }
  }, [value]);

  useEffect(() => {
    if (startDay && endDay) {
      let _startDay = isDate(startDay) ? startDay : new Date(startDay);
      let _endDay = isDate(endDay) ? endDay : new Date(endDay);
      if (_startDay > _endDay) {
        setMessage("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc");
      } else {
        setMessage(null);
      }
    }
  }, [startDay, endDay]);

  return (
    <>
      <Wrapper ref={dateDisplayBoxRef}>
        <DisplayBox onClick={() => setFromDatePopup((prev) => !prev)}>
          <span>{format(startDay, "dd/MM/yyyy")}</span>
          <IcCalendar />
        </DisplayBox>
        <DisplayBox onClick={() => setToDatePopup((prev) => !prev)}>
          <span>{format(endDay, "dd/MM/yyyy")}</span>
          <IcCalendar />
        </DisplayBox>
      </Wrapper>
      {message != null && (
        <div className={classes["error-message"]}>{message}</div>
      )}
      <div style={{ marginTop: "10px" }}>
        <ButtonForm
          onClick={handleSubmitDate}
          className="ButtonFormFilter"
          disabled={message ? true : false}
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
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ padding: "0 10px" }}
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
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ padding: "0 10px" }}
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
