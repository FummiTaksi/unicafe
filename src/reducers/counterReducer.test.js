import deepFreeze from 'deep-freeze'
import {counterReducer} from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = []
    const action = {
      type: 'DO_NOTHING'
    }
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })
})