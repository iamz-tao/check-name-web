// export const isProfessor = role => (
//   role
//     .toLowerCase()
//     .indexOf('PROFESSOR') > -1
// )

export const isProfessor = role => (role === 'PROFESSOR')

export const isAdmin = role => (role === 'ADMIN')

export const thisIsRole = (role = '') => ({
  PROFESSOR: () => isProfessor(role),
  ADMIN: () => isAdmin(role),
})
