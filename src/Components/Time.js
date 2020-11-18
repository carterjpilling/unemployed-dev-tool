import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

function Time(props) {
  const [clock, setClock] = useState([])

  useEffect(() => {
    if (props.isLoggedIn) {
      console.log('Ran Function')
      getTime()
    }
  }, [props.date, props.isLoggedIn])

  function getTime() {
    setClock([])
    axios.get(`/api/user/clock/${props.date}`, {
      date: props.date
    }).then((res) => {
      setClock(res.data)
    })

  }
  return (
    <>
      <p>Time.js</p>
    </>
  )
}

const mapStateTopProps = state => state

export default connect(mapStateTopProps)(Time)