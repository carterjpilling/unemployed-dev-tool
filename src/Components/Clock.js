import React, { useEffect, useState } from 'react'
import Time from './Time'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Clock(props) {
  const classes = useStyles();
  const [clockOption, setClockOption] = useState(null)

  useEffect(() => {
  }, [props.date])

  function clockin() {
    axios.post('/api/user/clockin', {
      option_id: clockOption,
      date: props.date
    })
  }

  function clockout() {
    axios.put('/api/user/clockout', {
      date: props.date
    })
  }

  function handleChange(e) {
    setClockOption(e.target.value)
  }

  return (
    <div>
      <button onClick={() => clockin()}>Clock In</button>
      <button onClick={() => clockout()}>Clock Out</button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Clock Option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={clockOption}
          onChange={handleChange}
        >
          <MenuItem value={1}>Job Hunting</MenuItem>
          <MenuItem value={2}>Coding</MenuItem>
          <MenuItem value={3}>Researching/Learning</MenuItem>
          <MenuItem value={5}>WhiteBoarding / Interview Practice</MenuItem>
          <MenuItem value={4}>Other</MenuItem>
        </Select>
      </FormControl>
      <p>Clock</p>
      <Time date={props.date} />
    </div>
  )
}