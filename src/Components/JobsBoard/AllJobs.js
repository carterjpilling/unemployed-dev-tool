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

function AllJobs() {
  const classes = useStyles();
  const [allJobs, setAllJobs] = useState([])
  const [editOpen, setEditOpen] = useState(false)
  const [status, setStatus] = useState('Job Status')
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

  function editJob(jobId) {
    allJobs.map((e) => {
      setStatus(e.job_status)
      setEditState({
        id: jobId,
        name: e.job_name,
        link: e.job_link,
        notes: e.job_notes,
        description: e.job_description,
        company: e.job_company,
      })
      return (<></>)
    })
    setEditOpen(true)

  }

  function handleClose() {
    setEditOpen(false)
    setEditState({
      id: null,
      name: null,
      link: null,
      notes: null,
      description: null,
      company: null
    })
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
      {mappedJobs}
      {editOpen === true &&
        <EditModal
          open={editOpen}
          setOpen={setEditOpen}
          editJob={editJob}
          editState={editState}
          handleClose={handleClose} />}
    </div>
  )
}

export default AllJobs