# performance
node js performance timing library

## Introduction

This library is intended to make added performance profiling data into code a little less bothersome. Supports starting multiple timers and report back all stopped timers and their elapsed value.

```javascript
import performance from 'performance'

performance.time('TimerOne')

someLongRunningOperationWhichTakesACallbackMaybe( (err, data) -> {
    performance.timeEnd('TimerOne')
})

...
// Some time later

performance.timings()
/**
 * { TimerOne: nnn.xxx }
 **/

```
