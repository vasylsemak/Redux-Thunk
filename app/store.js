import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const GOT_PETS_FROM_SERVER = 'GOT_PETS_FROM_SERVER'


const gotPets = pets => ({
  type: GOT_PETS_FROM_SERVER,
  pets
})

export const getPetsThunk = () => async(dispatch, getState) => {
  try {
    const { data } = await axios.get('/http://localhost:3000/pets')
    console.log("DATA ---> ", data)

    dispatch(gotPets(data))
  } catch(error) { next(error) }
}

const initialState = {
  pets: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PETS_FROM_SERVER:
      return {...state, pets: action.pets}
    default:
      return state
  }
}

const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware)
const store = createStore(reducer, middlewares)

export default store
