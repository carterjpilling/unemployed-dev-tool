import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card'



function AllJobs() {
  const [allJobs, setAllJobs] = useState([])

  useEffect(() => {
    axios.get('/api/users/jobs').then((res) => {
      setAllJobs(res.data)
    })
  }, [])

  const mappedJobs = allJobs.map((e, i) => {
    return (
      <Card key={i}>

      </Card>
    )
  })

  return (
    <>
    </>
  )
}

export default AllJobs