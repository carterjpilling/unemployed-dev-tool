import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Jobs(props) {
  const classes = useStyles();
  const [jobs, setJobs] = useState([])
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [state, setState] = useState({
    status: '',
    name: '',
    link: '',
    notes: '',
    company: ''
  })
  useEffect(() => {
    if (props.isLoggedIn) {
      getJobs()
    }
  }, [props.date, props.isLoggedIn])




  function getJobs() {
    setJobs([])
    axios.get(`/api/users/jobs/${props.date}`).then((res) => {
      setJobs(res.data)
    })
  }

  function saveJob() {
    axios.post('/api/user/jobs', {
      date: props.date,
      job_status: state.status,
      job_name: state.name,
      job_company: state.company,
      job_link: state.link,
      job_notes: state.notes
    })
      .then(() => getJobs())
  }

  function editJob(id) {
    console.log(id)
    setEditOpen(true)
    setOpen(true)
  }

  function saveEdit(id) {
    axios.put(`/api/users/jobs/${id}`, {
      date: props.date,
      job_status: state.status,
      job_name: state.name,
      job_company: state.company,
      job_link: state.link,
      job_notes: state.notes
    })
      .then(() => getJobs())

  }

  function deleteJob(id) {
    axios.delete(`/api/users/jobs/${id}`)
      .then(() => getJobs())
      .catch((err) => console.log(err))

  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInput(e) {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  const editBody = (
    /*Need to have a drop down for status*/
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Job</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <input
        value={state.name}
        type='name'
        name='name'
        onChange={(e) => handleInput(e)} />
      <input
        value={state.company}
        type='company'
        name='company'
        onChange={(e) => handleInput(e)} />
      <input
        value={state.link}
        type='link'
        name='link'
        onChange={(e) => handleInput(e)} />
      <input
        value={state.notes}
        type='notes'
        name='notes'
        onChange={(e) => handleInput(e)} />
      <input />
    </div>
  )
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <input
        type='name'
        name='name'
        onChange={(e) => handleInput(e)} />
      <input />
    </div>
  );

  const mappedJobs = jobs.map((e, i) => {
    return (
      <div key={i}>
        <p>{e.job_name}</p>
        <p>{e.job_company}</p>
        <button href={e.job_link}>Link</button>
        <p>{e.job_notes}</p>
        <button onClick={() => editJob(e.id)}>Edit Job </button>
      </div>
    )
  })

  return (
    <div>
      {mappedJobs}
      <button type="button" onClick={handleOpen}>
        + New Job
      </button>
      {editOpen === true ?
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {editBody}
        </Modal>
        : <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>}
    </div>
  )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Jobs)