import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import Cookie from 'js-cookie'
import { bindActionCreators, compose } from 'redux'

import { Link } from '~/routes'
import LogoSrc from '~/static/images/ku-en-squear.png'
import { userAction } from '~/modules/user/actions'
import { loginAction } from '~/modules/authentication/actions'


const breakpoint = 800
const height = 62

const Wrapper = styled.nav`
  background-color: ${props => props.theme.colors.white};
  height: ${height}px;
  padding: 0 20px;
  display: flex;
  
  @media screen and (max-width: ${breakpoint}px) {
    img {
      display: none;
    }
    label {
      display: block;
    }
  }
`

const Image = styled.img`
  height: ${height}px;
  object-fit: cover;
  cursor:pointer;
  
  
`

const Menu = styled.li`
  width: 100px;
  position: relative;
  list-style: none;
  cursor:pointer;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  flex: 1;

  ${props => props.submenu && css`
    &:before {
      color: ${props.theme.colors.default};
      content: '◀';
      top: 0;
      line-height: 66px;
      position: absolute;
      right: 5px;
      font-size: 1em;
      transform: rotate(270deg);
    }
  `}
  
  a {
    color: ${props => props.theme.colors.default};
    text-transform: uppercase;
    text-decoration: none;
  }
  
  ul {
    padding: 0;
    color: ${props => props.theme.colors.default};
    display: none;
    position: absolute;
    background-color: ${props => props.theme.colors.secondary};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 3px solid rgba(244,244,244,1);
    border-top: 0;
    flex-direction: column;
    width: 12%;
    top: 86%;

    li {
      list-style: none;
      height: 46px;
      align-items: center;
      display: flex;
      justify-content: center;
      
      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
   
   &:hover {

    ::before, a {
    }

    ul {
      width: 20%; 
      height: 96px;
      z-index: 111;
      display: block;
      background-color: ${props => props.theme.colors.white};
      
      li:hover {
        background-color: rgba(244,244,244,1);
      }
    }
   }
  
  @media screen and (max-width: ${breakpoint}px) {
    display: block;
    padding: 20px;
    
    ${props => props.submenu && css`
      &:hover {
        ::before {
          transform: rotate(90deg);
        }
        ul {
          position: relative;
        }
        
        ul li {
          padding: 20px 0;
        }
      }
    `}
  }
  
  ${props => props.show && css`
    display: block;    
  `}
  
`


const Profile = styled.p`
  text-transform: initial;
  ::before {
    text-transform: capitalize;
    content: attr(data-content);
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 0.7em;
    top: 4px;
    right: -30px;
    color: ${props => props.theme.colors.label};
    display: flex;
    justify-content: flex-end;
    right: 23px;
    font-family: kanit;
    font-size: 12px;
  }
`

class Navbar extends Component {
  componentDidMount() {
    const { getUserProfileWithToken } = this.props
    getUserProfileWithToken()
  }

  logout = () => {
    const { logout, handleLogout } = this.props
    logout()
    handleLogout()
    window.location.href = '/'
  }

  profile = () => {
    window.location.href = '/profile'
  }

  render() {
    const {
      userProfile,
    } = this.props
    const token = Cookie.get('token', '')
    let fname = ''
    let lname = ''
    if (userProfile) {
      fname = userProfile.get('firstname', '-')
      lname = userProfile.get('lastname', '-')
    }

    const userRole = Cookie.get('role', '')
    const isProfessor = token !== null && userRole === 'PROFESSOR'
    const isAdmin = token !== null && userRole === 'ADMIN'
    const homePath = isProfessor ? '/professor' : isAdmin ? '/admin' : '/'

    return (
      <Wrapper>
        <Link
          to={homePath}
          href={homePath}
        >
          <Image
            src={LogoSrc}
            height={66}
          />
        </Link>
        <Menu
          submenu
          style={{
            width: 150,
          }}
        >
          <a
            href='#'
          >
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: '0px 25px',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              <Profile
                data-content={userRole}
              >
                {`${fname} ${lname}`}
              </Profile>
            </div>
          </a>
          <ul>
            <li onClick={this.profile}>
            PROFILE
            </li>
            <li onClick={this.logout}>
            LOGOUT
            </li>
          </ul>
        </Menu>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.getIn(['user', 'user', 'profile']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserProfileWithToken: userAction.getUserProfileWithToken,
  logout: userAction.logout,
  handleLogout: loginAction.handleLogout,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Navbar)
