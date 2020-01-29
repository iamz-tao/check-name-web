import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const setToken = (idToken, accessToken) => {
  if (!process.browser) {
    return
  }
  Cookie.set('user', jwtDecode(idToken))
  Cookie.set('idToken', idToken)
  Cookie.set('accessToken', accessToken)
}

export const unsetToken = () => {
  if (!process.browser) {
    return
  }
  Cookie.remove('idToken')
  Cookie.remove('accessToken')
  Cookie.remove('user')

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromServerCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const jwtCookie = req.headers.cookie.split(';')
    .find(c => c.trim()
      .startsWith('idToken='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}

export const getUserFromLocalCookie = () => Cookie.getJSON('user')

export function redirectAuth({
                               withAuth = false,
                               withoutAuth = false,
                             } = {}) {
  return ComposedComponent => class extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    }

    static async getInitialProps(ctx) {
      let composedProps = {}

      if (ComposedComponent.getInitialProps) {
        composedProps = await ComposedComponent.getInitialProps({
          ...ctx,
        })
      }

      return composedProps
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
}
