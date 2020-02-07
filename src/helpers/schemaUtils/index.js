import intersection from 'lodash/intersection'

export const getNeedKey = (schemaKeys, dataKeys) => intersection(schemaKeys, dataKeys)

export const validateSchema = (schema, data) => {
  const schemaKeys = Object.keys(schema)
  const dataKeys = Object.keys(data)

  const needKeys = getNeedKey(schemaKeys, dataKeys)

  const payload = needKeys.reduce((acc, curr) => {
    acc[curr] = data[curr]
    return acc
  }, {})

  return payload
}
