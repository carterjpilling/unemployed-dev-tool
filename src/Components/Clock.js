import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Time from './Time'
import axios from 'axios'

export default function Clock(props) {
  const [clockOption, setClockOption] = useState({
    id: null,
    name: 'Time Clock Options'
  })

  useEffect(() => {
  }, [props.date])

  function clockin() {
    axios.post('/api/user/clockin', {
      option_id: clockOption.id,
      date: props.date
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
          {clockOption.name}
        </Dropdown.Toggle>

        <Dropdown.Menu
        >
          <Dropdown.Item onSelect={() => setClockOption({ id: 2, name: 'Job Hunting' })}>Job Hunting</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption({ id: 1, name: 'Coding' })}>Coding</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption({ id: 3, name: 'Researching/Learning' })}>Researching/Learning</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption({ id: 5, name: 'WhiteBoarding / Interview Practice' })}>WhiteBoarding / Interview Practice</Dropdown.Item>
          <Dropdown.Item onSelect={() => setClockOption({ id: 4, name: 'Other' })}>Other</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <p>Clock</p>
      <Time date={props.date} />
    </div>
  )
}