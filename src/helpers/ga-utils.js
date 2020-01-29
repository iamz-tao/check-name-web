import ReactGA from 'react-ga'

import {
  googleAnalyticsTrackingID,
  env,
} from '~/config/app-config'

export const initGA = () => {
  ReactGA.initialize(googleAnalyticsTrackingID, { debug: env === 'production' })
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
