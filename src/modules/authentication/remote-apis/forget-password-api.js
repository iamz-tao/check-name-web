import axios from 'axios'
import { apiEndpoint } from '~/config/app-config'

export const forgetPasswordWithEmail = async (payload) => {
  try {
    try {
      const result = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'text/plain',
        },
        url: `${apiEndpoint}/spotsme_v1/Forget%20Password%20API`,
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
