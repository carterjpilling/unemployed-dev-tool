import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 10,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function handleInput(e) {

}

function EditJobModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)


  const body = (
    <div style={modalStyle} className={classes.paper} >
      <h2 id="simple-modal-title">Edit Job</h2>

      <input
        value={props.editState.name}
        type='name'
        name='name'
        onChange={(e) => handleInput(e)}
      />
      <input
        value={props.editState.company}
        type='company'
        name='company'
        onChange={(e) => handleInput(e)}
      />
      <input
        value={props.editState.link}
        type='link'
        name='link'
        onChange={(e) => handleInput(e)}
      />
      <input
        value={props.editState.notes}
        type='notes'
        name='notes'
        onChange={(e) => handleInput(e)}
      />
      <input
        value={props.editState.description}
        type='description'
        name='description'
        onChange={(e) => handleInput(e)}
      />
    </div>
  )

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

export default EditJobModal