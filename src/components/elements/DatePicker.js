import React, { useEffect, useState } from "react";
import moment from 'moment';
import styled from "styled-components";

import { DayPickerRangeController } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import "./DatePicker.css"

function DatePicker(props) {
  const {condition , setCondition, onClose} = props;
  const dateFormat = "YYYY-MM-DD";
  const initialDates = {
    start : (condition.startDate)? moment(condition.startDate) : null,
    end : (condition.endDate)? moment(condition.endDate) : null,
  }
  const [focused, setFocused] = useState('startDate');
  const [startDate, setStartDate] = useState(initialDates.start);
  const [endDate, setEndDate] = useState(initialDates.end);
  useEffect(()=>{
    setCondition({...condition, startDate : startDate?.format(dateFormat), endDate : endDate?.format(dateFormat)})
  },[startDate, endDate])

  const dateBlocked = (day) =>{
    const bool = day.isBefore(moment());
    return bool
  }

  return (
    <div>
      <OutOfModal onClick={onClose} />
      <DayPickerWindow>
        <DayPickerRangeController 
          startDate={startDate}
          endDate={endDate}
          focusedInput={focused}
          dayAriaLabelFormat="YYYY MM DD"
          onFocusChange={(focusedInput)=>{
            setFocused(!focusedInput? 'startDate': focusedInput);
          }}
          onDatesChange={(selectedDates)=>{
            if(focused ==='startDate'){
              setStartDate(selectedDates.startDate)
              setCondition({...condition, endDate : null});
              setEndDate(null);
            }else{
              setEndDate(selectedDates.endDate)
            }
          }}
          hideKeyboardShortcutsPanel = {true}
          isDayBlocked={dateBlocked}
        />
      </DayPickerWindow>
    </div>
  )
}

export default DatePicker;

const OutOfModal = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  z-index: 10;
`

const DayPickerWindow = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  border: none;
  height: 400px;
  width: 100%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  overscroll-behavior: contain;
  overflow-y: scroll;
  z-index: 10;
`