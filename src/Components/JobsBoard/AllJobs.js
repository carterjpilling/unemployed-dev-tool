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

function AllJobs() {
  const classes = useStyles();
  const [allJobs, setAllJobs] = useState([])
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    axios.get('/api/users/jobs').then((res) => {
      setAllJobs(res.data)
    })
  }, [])

  function editJob() {
    setEditOpen(true)
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
      {editOpen === true && <EditModal open={editOpen} setOpen={setEditOpen} />}
    </div>
  )
}

export default AllJobs