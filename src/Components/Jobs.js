import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

function Jobs(props) {

  const [jobs, setJobs] = useState([])
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
  return (
    <>
      <p>Jobs</p>
    </>
  )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Jobs)