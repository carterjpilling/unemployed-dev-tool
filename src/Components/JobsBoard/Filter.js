import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'


export default function Filter(props) {
  function handleChange(event) {
    // props[event.target.name]
  }
  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.filterJobs}
              onChange={handleChange}
              name="allJobsFilter"
              color="primary"
            />
          }
          label="All Jobs"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={props.filterDay}
              onChange={handleChange}
              name="day"
              color="primary"
            />
          }
          label="Sort by Day"
        />
      </FormGroup>
    </div>
  )
}