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
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [statusState, setStatusState] = useState('')
  const [nameState, setNameState] = useState('')
  const [linkState, setLinkState] = useState('')
  const [noteState, setNoteState] = useState('')
  const [companyState, setCompanyState] = useState('')
  useEffect(() => {
    if (props.isLoggedIn) {
      console.log('Job Function')
      getJobs()
    }
  }, [props.date, props.isLoggedIn])




  function getJobs() {
    setJobs([])
    axios.get('/api/users/jobs/:date').then((res) => {
      setJobs(res.data)
    })
  }

  function saveJob() {
    axios.post('/api/user/jobs', {
      date: props.date,
      job_status: statusState,
      job_name: nameState,
      job_company: companyState,
      job_link: linkState,
      job_notes: noteState
    })
      .then(() => getJobs())
  }

  function editJob(id) {
    //I can either get the id from the jobs state or get it from the backend.... 

  }
  function saveEdit(id) {
    axios.put(`/api/users/jobs/${id}`, {
      date: props.date,
      job_status: statusState,
      job_name: nameState,
      job_company: companyState,
      job_link: linkState,
      job_notes: noteState
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <input placeholder='Job Name' />
      <input placeholder='Job ' />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        + New Job
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Jobs)