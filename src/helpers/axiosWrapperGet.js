import axios from 'axios'
import Cookies from 'js-cookie'
import { apiEndpoint } from '~/config/app-config'

const responseStatusWhiteList = ['SUCCESS', 'ADD', 'DONE']

const http = async (url = '/api', payload = {}) => {
  try {
    try {
      const token = Cookies.get('token', '')
      const result = await axios({
        method: 'get',
        headers: {
          token,
        },
        url: `${apiEndpoint}${url}`,
        data: JSON.stringify({
          ...payload,
          timestamp: +(new Date()),
        }),
      })

      const { data, status } = result

      if (status === 400) {
        return {
          status,
          error: true,
          message: 'Bad Request',
        }
      }

      const { message, status: dataStatus } = data
      if (responseStatusWhiteList.indexOf(dataStatus.dataStatus) < 0) {
        return {
          error: true,
          message,
          status: dataStatus,
        }
      }
      return {
        data,
      }
    } catch (error) {
      return {
        error: true,
        message: error.message,
      }
    }
  } catch (error) {
    return {
      error: true,
      exception: error,
    }
  }
}

/** @param {{ url?: string, payload?: any }} data */
export const post = ({ url, payload }) => http(url, payload)

/** @param {{ url?: string, payload?: any }} data */
export const put = ({ url, payload }) => http(url, payload)

/** @param {{ url?: string, payload?: any }} data */
export const get = ({ url, payload }) => http(url, payload)

/** @param {{ url?: string, payload?: any }} data */
export const list = ({ url, payload }) => http(url, payload)

/** @param {{ url?: string, payload?: any }} data */
export const remove = ({ url, payload }) => http(url, payload)
