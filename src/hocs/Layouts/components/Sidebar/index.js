import React,
{
  Fragment,
  memo,
  useEffect,
  useState,
} from 'react'
import { Icon } from 'antd'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import Cookie from 'js-cookie'

import { getNameWithEmail, getUserRoleName } from '~/helpers/user-utils'
import { Link } from '~/routes'
import * as localeSelectAction from '~/modules/locale/actions'
import { userAction } from '~/modules/user/actions'
import { loginAction } from '~/modules/authentication/actions'
import withIntl from '~/helpers/withIntl'

import CustomerSidebar from './CustomerSidebar'
import VendorSidebar from './VendorSidebar'
import AdminSidebar from './AdminSidebar'

import {
  Closeable,
  Menu,
  Menus,
  Profile,
  SidebarWrapper,
  SideMenu,
} from './Shared'

const Sidebar = (props) => {
  const {
    sidebar, //false
    setSidebar, //function
    role, // PROFESSOR
    token, 
    email,
    name,
    // profile,
    // currentPath,
  } = props
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(userAction.logout())
    dispatch(loginAction.handleLogout())
    window.location.href = '/'
  }

  const isLogin = token !== null 
  const isProfessor = token !== null && role === 'PROFESSOR'
  const isAdmin = token !== null && role === 'ADMIN'

  return (
    <Fragment>
      <SidebarWrapper/>
      <SideMenu>
        <Menus>
        

           {
            isLogin && isAdmin && (
              <AdminSidebar
                currentPath='/admin'
              />
            )
          } 

          {
            // isLogin && isAdmin && (
              isLogin && isProfessor && (
              <AdminSidebar
                currentPath='/professor'
              />
            )
          }
        </Menus>
      </SideMenu>
    </Fragment>
  )
}

export default memo(withIntl(Sidebar))
