import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Time from './Time'
import axios from 'axios'

export default function Clock(props) {
  const [clockOption, setClockOption] = useState()

  useEffect(() => {
  }, [props.date])

  function clockin() {
    axios.post('/api/user/clockin', {
      option_id: 1,
      date: clockOption
    })
  }

  function clockout() {
    axios.put('/api/user/clockout', {
      date: props.date
    })
  }

  return (
    <div>
      <button onClick={() => clockin()}>Clock In</button>
      <button onClick={() => clockout()}>Clock Out</button>
      <Dropdown
        drop='right'

      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Time Clock Options
        </Dropdown.Toggle>

        <Dropdown.Menu
        >
          <Dropdown.Item onSelect={() => setClockOption(2)}>Job Hunting</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption(1)}>Coding</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption(3)}>Researching/Learning</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption(5)}>WhiteBoarding / Interview Practice</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption(4)}>Other</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <p>Clock</p>
      <Time date={props.date} />
    </div>
  )
}