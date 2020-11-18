import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import Clock from './Clock'
import Goals from './Goals'
import Jobs from './Jobs'
import Notes from './Notes'


export default function Cal() {
  const [dateState, setDateState] = useState(new Date())
  const [dateValue, setDateValue] = useState()
  const changeDate = (e) => {
    setDateState(e)
  }

  useEffect(() => {
    setDateValue(dateState.toDateString().slice(4))
  }, [dateState])

  function logger() {
    console.log(dateValue)

  }

  return (
    <>
      <Calendar
        value={dateState}
        onChange={changeDate}
      // formatLongDate={dateState}
      />
      <Clock date={dateValue} />
      <Goals date={dateValue} />
      <Jobs date={dateValue} />
      <Notes date={dateValue} />


      <p>Current selected Date is<b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
      <button onClick={() => logger()}>LOG</button>
    </>
  )
}