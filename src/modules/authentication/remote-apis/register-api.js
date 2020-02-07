import axios from 'axios'
import { apiEndpoint } from '~/config/app-config'

export const registerUser = async (payload) => {
  try {
    const result = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'text/plain',
      },
      url: `${apiEndpoint}/spotsme_v1/Register%20New%20User%20API`,
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
    if (dataStatus === 'failed' || dataStatus === 'EXIST') {
      return {
        error: true,
        message,
      }
    }
    return {
      message,
    }
  } catch (e) {
    return {
      error: true,
      message: e.message,
    }
  }
}
