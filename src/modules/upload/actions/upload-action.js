import {
  UPLOAD_IMAGE,
  LOADING_IMAGE,
} from '../constants'

export const uploadImage = payload => ({
  payload,
  type: UPLOAD_IMAGE,
})

export const loadingImage = payload => ({
  payload,
  type: LOADING_IMAGE,
})
