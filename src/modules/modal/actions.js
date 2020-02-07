import {
  SET_MODAL,
} from './constants'

module.exports = {
  setModal: payload => ({
    payload,
    type: SET_MODAL,
  }),
}
