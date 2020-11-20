module.exports = {
  saveJobs: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { job, date } = req.body
    const [existingDate] = await db.check_date([date])

    if (existingDate) {
      await db.post_jobs([job, id, existingDate.id])
    }

    if (!existingDate) {
      const [newDate] = await db.create_date([date])
      await db.post_jobs([job, id, newDate.id])
    }

    res.sendStatus(200)
  },
  getJobs: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    //Will need to change to date = req.query
    const { date } = req.params

    const jobs = await db.get_jobs([id, date])

    res.status(200).send(jobs)
  },
  editJob: async (req, res) => {
    //Need to write this when the front end is built. Not sure how I'll get the id but I'll need to use it. Will be similar to deleteJob. 
    //Additionally, maybe ArtGallery could provide some context to deleting. 

    const db = req.app.get('db')
    const { id, job } = req.body
    await db.edit_job([id, job])

    res.sendStatus(200)

  },
  deleteJob: async (req, res) => { },

}