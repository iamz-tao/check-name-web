import {
  GET_BEACON_ALL,
  SET_TO_BEACON,
  DELETE_BEACON,
  DELETE_TO_BEACON,
} from '../constants'

export const getBeaconAll = payload => ({
  payload,
  type: GET_BEACON_ALL,
})

export const setToBeacon = payload => ({
  payload,
  type: SET_TO_BEACON,
})

export const deleteBeacon = payload => ({
  payload,
  type: DELETE_BEACON,
})

//Delet from redux
export const delelteToBeacon = payload => ({
  payload,
  type: DELETE_TO_BEACON,
})