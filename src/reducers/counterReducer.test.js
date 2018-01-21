import deepFreeze from 'deep-freeze'
import {counterReducer} from './reducer'


const getAction = (type) => {
  return ({
    type: type
  })
}
describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good increases ', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, getAction('GOOD'))
    expect(newState.good).toEqual(1)
  })

  it('ok increases', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, getAction('OK'))
    expect(newState.ok).toBe(1)
  })

  it('bad increases', () => {
    const state = initialState
    deepFreeze(state)
    const badIncreased = counterReducer(state,getAction('BAD'))
    expect(badIncreased.bad).toBe(1)
  })
  it('zero resets counter', () => {
    const state = initialState
    deepFreeze(state)
    const badIncreased = counterReducer(state,getAction('BAD'))
    const zero = counterReducer(badIncreased,getAction('ZERO'))
    expect(zero.bad).toBe(0)
  })
})