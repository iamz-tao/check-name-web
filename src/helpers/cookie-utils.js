import Cookie from 'js-cookie'

export function getValueFromCookie(key = '', cookie) {
  if (!cookie) {
    return undefined
  }

  const tmpCookie = cookie
    .split(';')
    .find(c => c.trim()
      .startsWith(`${key}=`)) || ''

  return tmpCookie.split('=')[1]
}

export function getValue(key = '', cookie) {
  if (cookie) {
    return getValueFromCookie(key, cookie)
  }

  return Cookie.get(key)
}

export function getValueJSON(key = '', cookie) {
  if (cookie) {
    try {
      return JSON.parse(
        decodeURIComponent(getValueFromCookie(key, cookie)),
      )
    } catch (e) {
      return undefined
    }
  }
  return Cookie.getJSON(key)
}
