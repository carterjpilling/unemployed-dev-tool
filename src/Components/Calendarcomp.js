import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

export default function Calendarcomp() {
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
  }

  return (
    <>
      <Calendar
        value={dateState}
        onChange={changeDate}
      />
      <p>Current selected Date is<b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
    </>
  )
}