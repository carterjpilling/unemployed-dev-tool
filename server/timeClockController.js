module.exports = {
  clockIn: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { option_id } = req.body

    await db.clockin([id, option_id])

    res.sendStatus(200)
  },
  clockOut: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const [punch_id] = await db.clockout([id])
    await db.calculate_times([punch_id.id])
    res.sendStatus(200)
  },
  getTimes: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const times = await db.get_times([id])
    console.log(times)

    res.sendStatus(200)

  }
}