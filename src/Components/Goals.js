import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  }
})

export default function Goals() {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root} direction="column" justifyContent="center" variant="outlined">
        <CardContent >
          <TextField style={{ padding: 24 }}
            placeholder='Notes' />
          <Typography gutterBottom variant="headline" component="h2">
            Notes Section
          </Typography>
        </CardContent>
        <CardActions direction="column" display='flex' justifyContent="center">

          <Button size='small' color='inherit'>
            Save Notes</Button>
        </CardActions>
      </Card>
    </div>
  )
}