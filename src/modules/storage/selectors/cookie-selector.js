import { defaultTo } from 'lodash'
import { createSelector } from 'reselect'
import { LANG } from '~/config/global-variables'

export const getCookie = (key, defaultValue) => createSelector(
  state => state.getIn(['storage', 'cookie', key], defaultValue),
  value => value,
)

export const getLang = createSelector(
  getCookie(LANG),
  value => defaultTo(value, 'th'),
)
