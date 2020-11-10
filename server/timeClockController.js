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
  getTodaysTimes: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const times = await db.get_times([id])

    console.log(times)
    res.sendStatus(200)
  },
  getAllTimes: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.session.user
    const times = await db.get_times([id])
    /*
      1. Sort by day.
      2. Sort by category.
    */

    //This will sort by day.
    const sortedPunches = times.reduce((groups, punch) => {
      const date = JSON.stringify(punch.start).split('T')[0];
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

    punchesDaySorted.forEach((element, index, object) => {
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

      element.punches.forEach((element, index, object) => {
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
    const timeReady = punchesDaySorted.map((element) => {
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
  }
}
/*
[
  {
    id: 3,
    clocked_user_id: 1,
    clock_option_id: 2,
    start: 2020-11-10T05:26:26.977Z,
    stop: 2020-11-10T05:30:12.864Z,
    clocked_time: PostgresInterval { minutes: 3, seconds: 45, milliseconds: 887.167 },
    date: null
  },
  {
    id: 10,
    clocked_user_id: 1,
    clock_option_id: 4,
    start: 2020-11-10T07:27:34.255Z,
    stop: 2020-11-10T07:27:36.484Z,
    clocked_time: PostgresInterval { seconds: 2, milliseconds: 229.522 },
    date: null
  },
  {
    id: 1,
    clocked_user_id: 1,
    clock_option_id: 1,
    start: 2020-11-10T05:04:40.453Z,
    stop: 2020-11-11T01:23:31.896Z,
    clocked_time: PostgresInterval {
      hours: 20,
      minutes: 18,
      seconds: 51,
      milliseconds: 443.3
    },
    date: null
  },
  {
    id: 12,
    clocked_user_id: 1,
    clock_option_id: 5,
    start: 2020-11-11T01:24:30.534Z,
    stop: 2020-11-11T01:24:32.651Z,
    clocked_time: PostgresInterval { seconds: 2, milliseconds: 116.739 },
    date: 2020-11-10T07:00:00.000Z
  }
]
*/