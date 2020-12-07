import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Status from './StatusSelector'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { CardActionArea } from '@material-ui/core'


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

function Jobs(props) {
  const classes = useStyles();
  const [jobs, setJobs] = useState([])
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [statusState, setStatusState] = useState('')
  const [state, setState] = useState({
    id: null,
    name: '',
    link: '',
    notes: '',
    description: '',
    company: ''
  })
  useEffect(() => {
    if (props.isLoggedIn) {
      setJobs([])
      axios.get(`/api/users/jobs/${props.date}`).then((res) => {
        setJobs(res.data)
      })
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
      job_status: statusState,
      job_name: state.name,
      job_company: state.company,
      job_link: state.link,
      job_description: state.description,
      job_notes: state.notes
    })
      .then(() => {
        getJobs()
        handleClose()
      })
  }

  function editJob(jobId) {
    jobs.map((e) => {
      if (e.id === jobId) {
        setStatusState(e.job_status)
        setState({
          id: jobId,
          name: e.job_name,
          link: e.job_link,
          notes: e.job_notes,
          description: e.job_description,
          company: e.job_company,
        })

      }
      return (<></>)
    })
    setEditOpen(true)
    setOpen(true)
  }

  function saveEdit() {
    axios.put(`/api/users/jobs/${state.id}`, {
      job_status: statusState,
      job_name: state.name,
      job_company: state.company,
      job_link: state.link,
      job_description: state.description,
      job_notes: state.notes
    })
      .then(() => {
        getJobs()
        handleClose()
      })

  }

  function deleteJob(id) {
    axios.delete(`/api/users/jobs/${id}`)
      .then(() => getJobs())
      .catch((err) => console.log(err))

  }

  function handleOpen() {
    setOpen(true);
  };

  function handleClose() {
    setEditOpen(false)
    setOpen(false)
    setStatusState('')
    setState({
      id: null,
      name: '',
      link: '',
      notes: '',
      description: '',
      company: ''
    })
  }

  function handleInput(e) {
    setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  const editBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Job</h2>
      <Status statusState={statusState}
        setStatusState={setStatusState}
      />
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
      <input
        value={state.description}
        type='description'
        name='description'
        onChange={(e) => handleInput(e)} />
      <button onClick={() => saveEdit()}>Save Changes</button>
    </div>
  )
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Fill out the fields below to save a new Job.
      </p>
      <Status statusState={statusState}
        setStatusState={setStatusState}
      />
      <div>
        <p>Job Name</p>
        <input
          type='name'
          name='name'
          onChange={(e) => handleInput(e)} />
      </div>
      <div>
        <p>Company Name</p>
        <input
          type='company'
          name='company'
          onChange={(e) => handleInput(e)} />
      </div>
      <div>
        <p>Job Link</p>
        <input
          type='link'
          name='link'
          onChange={(e) => handleInput(e)} />
      </div>
      <div>
        <p>Notes</p>
        <input
          type='notes'
          name='notes'
          onChange={(e) => handleInput(e)} />
      </div>
      <div>
        <p>Description</p>
        <input
          type='description'
          name='description'
          onChange={(e) => handleInput(e)} />
      </div>
      <button onClick={() => saveJob()}> Save Job</button>
    </div>
  );

  const mappedJobs = jobs.map((e, i) => {
    return (

      <Card className={classes.root} key={i} onClick={() => editJob(e.id)}>
        <CardActionArea>

          <CardHeader
            action={
              <IconButton aria-label="edit">
                <DeleteForeverIcon onClick={() => deleteJob(e.id)} />
              </IconButton>
            }
            title={e.job_name}
            subheader={e.job_company}
          />
        </CardActionArea>
      </Card>
    )
  })

  return (
    <div>

      <Card style={{ padding: 12 }}>
        {mappedJobs}
        <CardActions>
          <Button size='small' color='primary' onClick={handleOpen}>
            + Add New Job
          </Button>
        </CardActions>
      </Card>
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