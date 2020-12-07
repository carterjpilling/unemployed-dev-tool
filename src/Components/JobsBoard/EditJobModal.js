import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function EditJobModal(props) {
  const [modalStyle] = useState(getModalStyle)

  function handleClose() {
    props.setOpen(false)
  }
  const body = (
    <div style={modalStyle} >
      <h2 id="simple-modal-title">Edit Job</h2>
    </div>
  )

  return (
    <div>
      <Modal
        open={props.open}
        onClock={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

export default EditJobModal