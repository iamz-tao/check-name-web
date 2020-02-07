import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'

import { Router } from '~/routes'
import Navbar from '~/hocs/Layouts/components/Navbar'
import Header from '~/hocs/Layouts/components/Header'
import Sidebar from '~/hocs/Layouts/components/Sidebar'
import withIntl from '~/helpers/withIntl'

const sharedpages = ['/profile']

const PageLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false)
  const email = Cookie.get('email', '')
  const role = Cookie.get('role', '')
  const token = Cookie.get('token', '')
  const name = Cookie.get('name', '')
  const isProfessor = role === 'PROFESSOR'

  useEffect(() => () => {
    setSidebar(false)
  }, [])

  const isLogin = token && token !== ''
  const defaultHeight = 63

  return (
    <App>
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        token={token}
        email={email}
        name={name}
        // currentPath={currentPath}
        role={role}
        isProfessor={isProfessor}
      />
      <AppWrapper>
        <NavWrapper>
          <Nav>
            <Header
              userRole={role}
              setSidebar={setSidebar}
            />
          </Nav>
        </NavWrapper>
        <Box
          height={defaultHeight}
        />
        <BodyWrapper
          sidebar={sidebar}
        >
          {children}

        </BodyWrapper>
      </AppWrapper>
    </App>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
  // profile: PropTypes.instanceOf(Iterable),
}

PageLayout.defaultProps = {
  role: '',
}

const mapStateToProps = state => ({
  role: state.getIn(['user', 'user', 'profile', 'role']),
  profile: state.getIn(['user', 'user', 'profile']),
})

export default compose(
  memo,
  connect(mapStateToProps, null),
  withIntl,
)(PageLayout)

const Box = styled.div`
  width: ${props => props.width || 20}px;
  height: ${props => props.height || 20}px;
  
  /* @media screen and (max-width: 800px) {
    height: 57px;
  } */
`

const NavWrapper = styled.div`
  z-index: 999;
  position: relative;
`
const Nav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  user-select: none !important;

`
// language=SCSS prefix=&{ suffix=}
const App = styled.div`
    padding: 0;
    margin: 0;
    font-family: Kanit !important;
    background-color: #f1f1f1 !important;
    min-height: 100vh;
    overflow: hidden;
`

// language=SCSS prefix=&{ suffix=}
const AppWrapper = styled.div`
    z-index: 2;
    position: relative;
    min-height: 100vh;
    background-color: white;
`

// language=SCSS prefix=&{ suffix=}
// TODO: Can't scroll becuase height: 100vh;
const BodyWrapper = styled.div`
    display: ${props => (props.sidebar ? 'none' : 'block')};
    /* @media screen and (min-width: 800px) {
      display: block;
    } */
    position: relative;
    //height: calc(100vh - 109px); /* from NavWrapper */
    // height: 100vh;
    //overflow-y: scroll;

    .ui.grid {
      margin: 0;
    }

    ::-webkit-scrollbar,
    ::-webkit-scrollbar-thumb {
      display: none;
    }
`
