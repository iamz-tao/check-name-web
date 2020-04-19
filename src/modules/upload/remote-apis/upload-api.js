import axios from 'axios'
import { apiEndpoint } from '~/config/app-config'

export const uploadImage = async (payload) => {
  try {
    try {
      // const result = await axios({
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'text/plain',
      //   },
      //   url: ``,
      //   data: JSON.stringify(payload),
      // })

      // const { data, status } = result

      // if (status === 400) {
      //   return {
      //     error: true,
      //     message: 'Bad Request',
      //   }
      // }

      // const { message, status: dataStatus } = data
      // if (dataStatus !== 'SUCCESS') {
      //   return {
      //     error: true,
      //     message,
      //   }
      // }
      // return { data }
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
