import React,
{
  Fragment,
  memo,
} from 'react'
import { useDispatch } from 'react-redux'

import { userAction } from '~/modules/user/actions'
import { loginAction } from '~/modules/authentication/actions'
import withIntl from '~/helpers/withIntl'

import {
  Menus,
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

  return (
    <Fragment>
      <SidebarWrapper/>
      <SideMenu>
        
        <Menus/>
      </SideMenu>
    </Fragment>
  )
}

export default memo(withIntl(Sidebar))
