import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Status from '../StatusSelector'

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


function EditJobModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

  function handleInput(e) {
    props.setEditState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const body = (
    <div style={modalStyle} className={classes.paper} >
      <h2 id="simple-modal-title">Edit Job</h2>
      <Status statusState={props.status}
        setStatusState={props.setStatus} />
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
      <button onClick={() => props.saveEdit()}>Save Job</button>
    </div>
  )

  const newBody = (
    <div style={modalStyle} className={classes.paper} >
      <h2 id="simple-modal-title">Add New Job</h2>
      <Status statusState={props.status}
        setStatusState={props.setStatus} />
      < input
        type='name'
        name='name'
        onChange={(e) => handleInput(e)}
      />
      <input
        type='company'
        name='company'
        onChange={(e) => handleInput(e)}
      />
      <input
        type='link'
        name='link'
        onChange={(e) => handleInput(e)}
      />
      <input
        type='notes'
        name='notes'
        onChange={(e) => handleInput(e)}
      />
      <input
        type='description'
        name='description'
        onChange={(e) => handleInput(e)}
      />
      <button onClick={() => props.saveJob()}>Save Job</button>
    </div>
  )

  return (
    <div>
      {props.newJob === true ?
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {newBody}
        </Modal> :
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      }
    </div>
  )
}

export default EditJobModal