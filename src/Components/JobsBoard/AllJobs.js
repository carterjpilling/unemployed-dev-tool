import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import EditModal from './EditJobModal'
import CardActionArea from '@material-ui/core/CardActionArea'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 10,
  }
}));

function AllJobs(props) {
  const classes = useStyles();
  const [allJobs, setAllJobs] = useState([])
  const [editOpen, setEditOpen] = useState(false)
  const [status, setStatus] = useState('Job Status')
  const [newJob, setNewJob] = useState(false)
  const [editState, setEditState] = useState({
    id: null,
    name: null,
    link: null,
    notes: null,
    description: null,
    company: null
  })

  useEffect(() => {
    axios.get('/api/users/jobs').then((res) => {
      setAllJobs(res.data)
    })
  }, [])

  function getJobs() {
    axios.get('/api/users/jobs').then((res) => {
      setAllJobs(res.data)
    })
  }

  function editJob(jobId) {
    allJobs.map((e) => {
      if (e.id === jobId) {
        setStatus(e.job_status)
        setEditState({
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
    setNewJob(false)
    setEditOpen(true)

  }

  function saveEdit() {
    axios.put(`/api/users/jobs/${editState.id}`, {
      job_status: status,
      job_name: editState.name,
      job_company: editState.company,
      job_link: editState.link,
      job_description: editState.description,
      job_notes: editState.notes
    })
      .then(() => {
        getJobs()
        handleClose()
      })
  }

  function saveJob() {
    axios.post('/api/user/jobs', {
      date: props.date,
      job_status: status,
      job_name: editState.name,
      job_company: editState.company,
      job_link: editState.link,
      job_description: editState.description,
      job_notes: editState.notes
    })
      .then(() => {
        getJobs()
        setEditOpen(false)
        setNewJob(false)
      })
  }

  function handleClose() {
    setEditOpen(false)
    setNewJob(false)
    setEditState({
      id: null,
      name: null,
      link: null,
      notes: null,
      description: null,
      company: null
    })
  }

  function openNewJob() {
    setStatus(null)
    setEditOpen(true)
    setNewJob(true)
  }


  const mappedJobs = allJobs.map((e, i) => {
    return (
      <Card key={i} className={classes.root} onClick={() => editJob(e.id)}>

        <CardActionArea>
          <CardHeader
            title={e.job_name}
            subheader={e.job_company}

          />
        </CardActionArea>
      </Card>
    )
  })

  return (
    <div>
      <button onClick={() => openNewJob()}>New Job</button>
      {mappedJobs}
      {editOpen === true &&
        <EditModal
          open={editOpen}
          setOpen={setEditOpen}
          editJob={editJob}
          editState={editState}
          handleClose={handleClose}
          saveEdit={saveEdit}
          setEditState={setEditState}
          saveJob={saveJob}
          newJob={newJob}
          status={status}
          setStatus={setStatus} />}
    </div>
  )
}

export default AllJobs