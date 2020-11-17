import React, { useEffect } from 'react'
import Login from './LoginRegister'
import { connect } from 'react-redux'
import { getUser } from '../redux/authReducer'

function Navbar(props) {

  useEffect(() => {
    if (!props.isLoggedIn) {
      props.getUser().catch((err) => {

      })
    }
  })

  return (
    <>
      <p>Welcome Back {props.user.name}</p>
      <Login />
    </>
  )
}

const mapStateToProps = state => state
export default connect(mapStateToProps, { getUser })(Navbar)