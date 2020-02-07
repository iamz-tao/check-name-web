import axios from 'axios'
import Cookie from 'js-cookie'
import { apiEndpoint } from '~/config/app-config'

export const getProfileWithToken = async ({ token, email }) => {
  try {
    try {
      const result = await axios({
        method: 'get',
        headers: {
          token,
        },
        url: `${apiEndpoint}/api/getProfile/`,
        data: JSON.stringify({
          email,
          token,
        }),
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
        data,
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

export const updateProfileWithToken = async (payload) => {
  try {
    try {
      const token = Cookie.get('token', '')
      const result = await axios({
        method: 'put',
        headers: {
          token,
          'Content-Type': 'application/json',
        },
        url: `${apiEndpoint}/updateUser/${token}`,
        data: JSON.stringify(payload),
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
        data,
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
