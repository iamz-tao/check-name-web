import axios from 'axios'
import { apiEndpoint } from '~/config/app-config'


export const loginWithUsername = async (payload) => {
  try {
    try {
      const result = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `${apiEndpoint}/api/login`,
        data: JSON.stringify(payload.data),
      })
      const { data, status } = result
      if (status === 400) {
        return {
          error: true,
          message: 'Bad Request',
        }
      }
      const { message, status: dataStatus } = data
      const errorStatuses = ['NOTFOUND', 'failed', 'UNAUTHORIZED']
      if (errorStatuses.findIndex(e => e === dataStatus) > -1) {
        return {
          error: true,
          message,
        }
      }
console.log('succcess login')
      // return {
      //   data,
      //   message,
      // }
    } catch (e) {
      return {
        error: true,
        message: e.message,
      }
    }
  } catch (e) {
    return {
      error: true,
      exception: e,
    }
  }
}

export const confirmEmailWithToken = async (payload) => {
  try {
    try {
      const result = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'text/plain',
        },
        url: `${apiEndpoint}/spotsme_v1/Confirm%20Email%20API`,
        data: JSON.stringify(payload.data),
      })

      const { data, status } = result
      if (status === 400) {
        return {
          error: true,
          message: 'Bad Request',
        }
      }

      const { message, status: dataStatus } = data
      if (dataStatus === 'failed') {
        return {
          error: true,
          message,
        }
      }

      return {
        status: dataStatus === 'UPDATE' ? 400 : 201,
        message,
      }
    } catch (e) {
      return {
        error: true,
        message: e.message,
      }
    }
  } catch (e) {
    return {
      error: true,
      exception: e,
    }
  }
}
