module.exports = {
  saveJobs: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { date, job_status, job_name, job_company, job_link, job_description, job_notes } = req.body
    const [existingDate] = await db.check_date([date])

    if (existingDate) {
      await db.post_jobs([id, existingDate.id, job_status, job_name, job_company, job_link, job_description, job_notes])
    }

    if (!existingDate) {
      const [newDate] = await db.create_date([date])
      await db.post_jobs([id, newDate.id, job_status, job_name, job_company, job_link, job_description, job_notes])
    }

    res.sendStatus(200)
  },
  getJobs: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { date } = req.params

    const jobs = await db.get_jobs([id, date])

    res.status(200).send(jobs)
  },
  editJob: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    const { job_status, job_name, job_company, job_link, job_description, job_notes } = req.body
    await db.edit_job([id, job_status, job_name, job_company, job_link, job_description, job_notes])

    res.sendStatus(200)

  },
  deleteJob: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    await db.delete_job([id])
    res.sendStatus(200)
  },
  getAllJobs: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const jobs = await db.get_all_jobs([id])
    jobs.splice(0, 0, { id: 'fake', date: 'fake' })

    let jobList = []
    const sortedJobs = jobs.reduce((groups, job) => {
      const date = job.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(job)
      return groups
    })
    for (let prop in sortedJobs) {
      if (prop.length === 11) {
        sortedJobs[prop].map((e) => {
          jobList.push(e)
        })
      }
    }

    res.status(200).send(jobList)
  }

}