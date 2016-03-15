import { expect } from 'chai'
import performance from '..'

describe('performance', () => {

  it('should have a reset function', () => {
    expect(performance).to.have.property('reset')
    expect(performance.reset).to.be.a('function')
  })

  it('should have a time function', () => {
    expect(performance).to.have.property('time')
    expect(performance.time).to.be.a('function')
  })

  it('should have a timeEnd function', () => {
    expect(performance).to.have.property('timeEnd')
    expect(performance.timeEnd).to.be.a('function')
  })

  it('should have a timings function', () => {
    expect(performance).to.have.property('timings')
    expect(performance.timings).to.be.a('function')
  })

  describe('.reset', () => {
    it('resets the output of timings() to and empty object', () => {
      expect(performance.timings()).to.deep.equal({})
      performance.time('one')
      performance.timeEnd('one')
      expect(performance.timings().one).to.be.ok
      performance.reset()
      expect(performance.timings()).to.deep.equal({})
    })
  })

  describe('.timings', () => {

    beforeEach(() => {
      performance.reset()
    })

    it('returns an empty object when no timers have been added', () => {
      expect(performance.timings()).to.deep.equal({})
    })

    it('returns an empty object when no timers have been ended', () => {
      performance.time('one')
      expect(performance.timings()).to.deep.equal({})
    })

    it('returns an object with label as key when a timer with that label has ended', () => {
      performance.time('two')
      performance.time('three')
      performance.timeEnd('two')
      expect(Object.keys(performance.timings())).to.deep.equal(['two'])
    })

    it('timing for a key has a non-zero value', () => {
      performance.time('four')
      performance.timeEnd('four')
      expect(performance.timings().four).to.not.equal(0)
      expect(performance.timings().four).to.be.a('number')
    })

    it('calling .time multiple times before timeEnd should not reset timer', (done) => {
      performance.time('five')
      setTimeout(() => {
        performance.time('five')
        performance.timeEnd('five')
        expect(performance.timings().five).to.be.above(2.0)
        done()
      }, 2)
    })

    it('calling .timeEnd multiple times before should not update the result', () => {
      performance.time('six')
      performance.timeEnd('six')
      var sixTime = performance.timings().six
      performance.timeEnd('six')
      expect(performance.timings().six).to.equal(sixTime)
    })

    it('calling .timeEnd before .time should not do anything', () => {
      performance.timeEnd('seven')
      expect(performance.timings()).to.deep.equal({})
    })
  })
})
