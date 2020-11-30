import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'

export default function Goals() {
  return (
    <div>
      <Card style={{}}>
        <CardContent >
          <TextField style={{ padding: 24 }}
            placeholder='Notes' />
          <Typography gutterBottom variant="headline" component="h2">
            Notes Section
          </Typography>
        </CardContent>
        <CardActions>

          <Button size='small' color='inherit'>
            Save Notes</Button>
        </CardActions>
      </Card>
    </div>
  )
}