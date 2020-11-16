module.exports = {
  postDailyGoals: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { text, date } = req.body
    const [existingDate] = await db.check_date([date])

    if (existingDate) {
      await db.create_goal([text, existingDate.id, id])
    }

    if (!existingDate) {
      const [newDate] = await db.create_date([date])
      await db.create_goal([text, newDate.id, id])
    }

    res.sendStatus(200)
  },
  putDailyGoals: async (req, res) => {
    const db = req.app.get('db')
    //Will need to get the id from the front end depending on which Goal was clicked.
    const { id, text } = req.body
    await db.edit_goal([id, text])

    res.sendStatus(200)
  },
  getDailyGoals: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { date } = req.body
    const [existingDate] = await db.check_date([date])

    let goals = []

    if (existingDate) {
      goals = await db.get_daily_goals([id, existingDate.id])
    }

    if (!existingDate) {
      res.status(404).send('No Goals exist for today')
    }

    res.status(200).send(goals)
  },
  postWeeklyGoals: async (req, res) => { },
  putWeeklGoals: async (req, res) => { },
  getWeeklyGoals: async (req, res) => { }

}