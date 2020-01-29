import { SET_LOCALE } from '../constants'
import localeActions from '../actions'

describe('Locale Actions', () => {
  it('Should payload and type', () => {
    const expectData = {
      payload: 'th',
      type: SET_LOCALE,
    }
    const actual = localeActions.setLocale(expectData.payload)

    expect(expectData).toEqual(actual)
  })
})
