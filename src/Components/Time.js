import React, { useEffect } from 'react'

export default function Time(props) {

  useEffect(() => {
    console.log('Time Change')
  }, [props.date])

  return (
    <>
      <p>Time.js</p>
    </>
  )
}