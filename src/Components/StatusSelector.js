import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setStatusState(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Job Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.statusState}
          onChange={handleChange}
        >
          <MenuItem value={1}>Applied</MenuItem>
          <MenuItem value={2}>Wishlist</MenuItem>
          <MenuItem value={3}>Interview</MenuItem>
          <MenuItem value={4}>Offer</MenuItem>
          <MenuItem value={5}>Rejected</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}