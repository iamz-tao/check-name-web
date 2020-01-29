import React, { memo } from 'react'

import CustomerNavbar from './Customer'
import VendorNavbar from './Vendor'
import AdminNavbar from './Admin'
import Loading from './LoadingNav'

const Navbar = (field) => {
  const { role } = field
  const isVendor = role.indexOf('V') > -1
  const isCustomer = role === 'C'
  const isAdmin = role === 'A'

  if (role !== '') {
    if (isVendor) return <VendorNavbar />

    if (isCustomer) return <CustomerNavbar />

    if (isAdmin) return <AdminNavbar />
  }

  return <Loading />
}

export default memo(Navbar)
