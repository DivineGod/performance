let timers = {}
let timings = {}

export var performance = {
  time: (label) => {
    if (timers[label]) {
      return
    }
    timers[label] = process.hrtime()
  },
  timeEnd: (label) => {
    if (timings[label]) {
      return
    }
    if (timers[label]) {
      let dt = process.hrtime(timers[label])
      timings[label] = (dt[0] * 1e9 + dt[1]) / 1e6
    }
  },
  timings: () => {
    return timings
  },
  reset: () => {
    timers = {}
    timings = {}
  }
}
