import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import AllJobs from './AllJobs'

function JobsBoard() {
  const [dateState, setDateState] = useState(new Date())
  const [dateValue, setDateValue] = useState()
  const changeDate = (e) => {
    setDateState(e)
  }

  useEffect(() => {
    setDateValue(dateState.toDateString().slice(4))
  }, [dateState])

  return (
    <div>
      <Calendar
        value={dateState}
        onChange={changeDate} />
      <AllJobs date={dateValue} />
    </div>
  )
}

export default JobsBoard