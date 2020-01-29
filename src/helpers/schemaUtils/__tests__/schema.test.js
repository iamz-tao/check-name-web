import * as utils from '..'

test('Need Key', () => {
  const actual = utils.getNeedKey(['name', 'age'], ['name', 'age', 'status'])
  const expectData = ['name', 'age']

  expect(actual).toEqual(expectData)
})

test('should return data follow schema', () => {
  const schema = {
    name: {
      require: true,
    },
    age: {
      require: true,
    },
  }

  const data = {
    name: 'metromerce',
    age: 2,
    status: 'active',
  }

  const actual = utils.validateSchema(schema, data)
  const expectData = {
    name: 'metromerce',
    age: 2,
  }

  expect(actual).toEqual(expectData)
})
