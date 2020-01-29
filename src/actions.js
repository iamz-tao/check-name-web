export const actionTypes = {
  SAGACHECKING: 'SAGACHECKING',
}

export const sagaChecking = payload => ({
  payload,
  type: actionTypes.SAGACHECKING,
})
