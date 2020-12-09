import React, { useEffect } from 'react'
import Login from './LoginRegister'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
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
    <div>
      <AppBar position='static'>
        <ToolBar>
          <Typography >
            Welcome Back {props.user.name}
          </Typography>
          <Login />
        </ToolBar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => state
export default connect(mapStateToProps, { getUser })(Navbar)