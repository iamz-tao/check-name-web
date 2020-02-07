import { SET_LOCALE } from '../constants'
import localeReducer from '../reducer'

describe('Locale Reducer', () => {
  it('Should return default state', () => {
    const expectLanguage = 'en'
    const actual = localeReducer(undefined, {})

    expect(expectLanguage).toEqual(actual.get('lang'))
  })

  it('Should update language [th]', () => {
    const expectLanguage = 'th'
    const actual = localeReducer(undefined, {
      payload: expectLanguage,
      type: SET_LOCALE,
    })

    expect(expectLanguage).toEqual(actual.get('lang'))
  })

  it('Should update language [jp]', () => {
    const expectLanguage = 'jp'
    const actual = localeReducer(undefined, {
      payload: expectLanguage,
      type: SET_LOCALE,
    })

    expect(expectLanguage).toEqual(actual.get('lang'))
  })
})
