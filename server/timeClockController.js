module.exports = {
  clockIn: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { option_id, date } = req.body
    const [existingDate] = await db.check_date([date])

    if (existingDate) {
      await db.clockin([id, option_id, existingDate.id])
    }

    if (!existingDate) {
      const [newDate] = await db.create_date([date])
      await db.clockin([id, option_id, newDate.id])
    }

    res.sendStatus(200)
  },
  clockOut: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { date } = req.body
    const [existingDate] = await db.check_date([date])

    if (existingDate) {
      const [punch_id] = await db.clockout([id, existingDate.id])
      await db.calculate_times([punch_id.id])
    }

    if (!existingDate) {
      return res.status(404).send('No Clock-In Found')
    }

    res.sendStatus(200)
  },
  getTodaysTimes: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const { date } = req.params
    const [existingDate] = await db.check_date([date])
    if (!existingDate) {
      return res.status(404).send('No times for today.')
    }
    console.log(existingDate)
    const times = await db.get_todays_punches([id, date])

    let codingArr = []
    let jobHuntArr = []
    let researchArr = []
    let otherArr = []
    let whiteboardArr = []

    times.forEach((element) => {

      let hours = '00'
      let minutes = '00'
      let seconds = '00'
      if (element.clocked_time.hours !== undefined) {
        hours = element.clocked_time.hours
      }

      if (element.clocked_time.minutes !== undefined) {
        minutes = element.clocked_time.minutes
      }

      if (element.clocked_time.seconds !== undefined) {
        seconds = element.clocked_time.seconds
      }

      let obj = {
        clock_option: element.clock_option_id,
        time: `${hours}:${minutes}:${seconds}`,
        date: element.date
      }


      const CODING = 1
      const JOBHUNTING = 2
      const RESEARCHING = 3
      const OTHER = 4
      const WHITEBOARD = 5

      switch (element.clock_option_id) {
        case CODING:
          codingArr.push(obj)
          break
        case JOBHUNTING:
          jobHuntArr.push(obj)
          break
        case RESEARCHING:
          researchArr.push(obj)
          break
        case OTHER:
          otherArr.push(obj)
          break
        case WHITEBOARD:
          whiteboardArr.push(obj)
          break
        default:
          return null
      }
    })
    let timesSorted = []
    timesSorted.push(codingArr, jobHuntArr, researchArr, otherArr, whiteboardArr)

    res.status(200).send(timesSorted)
  },
  getAllTimes: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const times = await db.get_times([id])

    const sortedPunches = times.reduce((groups, punch) => {
      const date = punch.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(punch)
      return groups
    }, {})

    const punchesDaySorted = Object.keys(sortedPunches).map((date) => {
      return {
        date,
        punches: sortedPunches[date]
      }
    })

    punchesDaySorted.forEach((element) => {
      let codingArr = element.coding = []
      let jobHuntArr = element.jobHunt = []
      let researchArr = element.research = []
      let otherArr = element.other = []
      let whiteboardArr = element.whiteboarding = []

      function catSplitter(object) {
        const opt = object.clock_option
        if (opt === 1) {
          codingArr.push(object)
        } else if (opt === 2) {
          jobHuntArr.push(object)
        } else if (opt === 3) {
          researchArr.push(object)
        } else if (opt === 4) {
          otherArr.push(object)
        } else if (opt === 5) {
          whiteboardArr.push(object)
        }
      }

      element.punches.forEach((element) => {
        let hours = '00'
        let minutes = '00'
        let seconds = '00'
        if (element.clocked_time.hours !== undefined) {
          hours = element.clocked_time.hours
        }

        if (element.clocked_time.minutes !== undefined) {
          minutes = element.clocked_time.minutes
        }

        if (element.clocked_time.seconds !== undefined) {
          seconds = element.clocked_time.seconds
        }

        let obj = {
          clock_option: element.clock_option_id,
          time: `${hours}:${minutes}:${seconds}`
        }
        catSplitter(obj)
      })
    })

    let clockPunches = []
    punchesDaySorted.map((element) => {
      let obj = {
        date: element.date,
        coding: element.coding,
        jobHunt: element.jobHunt,
        research: element.research,
        other: element.other,
        whiteboarding: element.whiteboarding
      }
      clockPunches.push(obj)
    })
    res.status(200).send(clockPunches)
  },
  getClockOptions: async (req, res) => {
    const db = req.app.get('db')
    const options = await db.get_clock_options([])
    res.status(200).send(options)
  }
}
