// @ts-ignore
const routes = require('next-routes')()

routes
  .add('home', '/', 'home')
  .add('login', '/login', 'login')
  .add('register', '/register', 'register')
  .add('forget-password', '/forget-password', 'forget-password')
  .add('set-password', '/set-password', 'set-password')
  .add('profile', '/profile', 'profile')

  // Professor
  .add('professor', '/professor', '/professor')
  .add('professor-create-subject', '/professor-create-subject', '/professor/professorCreateSubject')
  .add('open-section', '/open-section', '/professor/openSection')
  .add('approve-student', '/approve-student', 'professor/approveStudent')
  
  // Admin
  .add('admin', '/admin', '/admin')
  .add('list-users', '/users', '/admin')
  .add('register-admin', '/adminRegister', '/admin/adminRegister')
  .add('approve-create-subject', '/approveSubject', '/admin/adminApprove')
  .add('create-subject', '/create-subject', '/admin/adminCreateSubject')
  .add('list-subjects', '/list-subjects', '/admin/adminListSubjects')
  .add('list-year', '/list-year', '/admin/adminListYear')
module.exports = routes
