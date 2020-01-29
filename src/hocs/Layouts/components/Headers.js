import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Link from 'next/link'
import {
  Icon,
  Image,
  Menu as SemanticMenu,
  Dropdown,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import Cookie from 'js-cookie'
import { fromJS, Iterable } from 'immutable'
import {
  Badge as AntBadge,
} from 'antd'
import { FormattedMessage } from 'react-intl'

import withIntl from '~/helpers/withIntl'
import { Link } from '~/routes'
import { urlAdvertiserPrefix } from '~/config/constants'
import { getNameWithEmail, getUserRoleName } from '~/helpers/user-utils'

import * as localeSelectAction from '~/modules/locale/actions'
import { userAction } from '~/modules/user/actions'
import { loginAction } from '~/modules/authentication/actions'
import { cartAction } from '~/modules/customer/actions'
import LogoSrc from '~/static/images/ku-en-squear.png'

const Badge = styled(AntBadge)`
  font-size: 1em;
  i {
    font-size: 1em;
  }
  
  .ant-badge-count {
    font-size: .7em;
  }
`

class Headers extends Component {
  state = {
    lang: 'th',
  }

  componentDidMount() {
    const lang = Cookie.get('lang') || 'th'
    const { getUserProfileWithToken } = this.props
    getUserProfileWithToken()
    this.setState({ lang })
  }

  handleChangeLang = () => {
    const { lang } = this.state
    const locale = lang === 'th' ? 'en' : 'th'
    const { fetchMessage } = this.props
    fetchMessage(locale)
    Cookie.set('lang', locale)
    this.setState({ lang: locale })
  }

  handleLogout = () => {
    const { handleLogout, logout } = this.props
    handleLogout()
    logout()
    window.location.href = '/'
  }

  render() {
    // const {
    //   userProfile,
    //   handleShowSidebar,
    //   cart,
    // } = this.props

    // const { lang } = this.state

    // let trigger = null
    // const isLoading = userProfile === null
    // const isLogin = userProfile !== null && userProfile.get('email')
    // const isCustomer = userProfile !== null && userProfile.get('role') === 'C'

    // if (!isLoading) {
    //   trigger = (
    //     <UserWrapper>
    //       <UserRoleWrapper>
    //         <UserRoleSpan>
    //           {/* {getUserRoleName(userProfile.get('role'))} */}
    //         </UserRoleSpan>
    //       </UserRoleWrapper>
    //       <UserNameWrapper>
    //         <UserNameSpan>
    //           {/* {userProfile.getIn(['profile', 'first_name'], getNameWithEmail(userProfile.get('email', '')))} */}
    //         </UserNameSpan>
    //       </UserNameWrapper>
    //     </UserWrapper>
    //   )
    // }

    const count = cart && (cart.get('sales_slots').size + cart.get('bundle_sales_slots').size)
    return (
      <HeaderWrapper>
        <Row>
          <Col>
            <LogoWrapper>
              <SidebarWrapper>
                <Icon
                  // name='sidebar'
                  // onClick={handleShowSidebar}
                />
              </SidebarWrapper>
              <Link
                // to={`${urlAdvertiserPrefix}/`}
                // href={`${urlAdvertiserPrefix}/`}
              >
                <Logo>
                  <Image
                    src={LogoSrc}
                    height={70}
                  />
                </Logo>
              </Link>
            </LogoWrapper>
          </Col>
          <Col>
            <Row>
              {/* {
                !isLoading && (
                  <LangSpan onClick={() => this.handleChangeLang()}>
                    {lang}
                    <Icon name='angle down' />
                  </LangSpan>
                )
              } */}

              {
                !isLoading && isLogin && (
                  <ProfileWrapper>
                    <Menu>
                      <Dropdown
                        // trigger={trigger}
                        item
                      >
                        <Dropdown.Menu>
                          <Link
                            to={`${urlAdvertiserPrefix}/profile`}
                            href={`${urlAdvertiserPrefix}/profile`}
                          >
                            <Dropdown.Item>
                              <FormattedMessage
                                id='Profile'
                                defaultMessage='Profile'
                              />
                            </Dropdown.Item>
                          </Link>
                          {/* <Dropdown.Item onClick={this.handleLogout}> */}
                          <Dropdown.Item>
                            <FormattedMessage
                              id='logout'
                              defaultMessage='LOGOUT'
                            />
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu>
                  </ProfileWrapper>
                )
              }

              {/* {
                !isLoading && !isLogin && (
                  <Link
                    to={`${urlAdvertiserPrefix}/login`}
                    href={`${urlAdvertiserPrefix}/login`}
                  >
                    <Button
                      basic
                      color='black'
                    >
                      <FormattedMessage
                        id='login'
                        defaultMessage='LOGIN'
                      />
                    </Button>
                  </Link>
                )
              } */}

              {/* {
                !isLoading && !isLogin && (
                  <Link
                    to={`${urlAdvertiserPrefix}/register`}
                    href={`${urlAdvertiserPrefix}/register`}
                  >
                    <Button
                      basic
                      color='black'
                    >
                      <FormattedMessage
                        id='sign-up'
                        defaultMessage='SIGN UP'
                      />
                    </Button>
                  </Link>
                )
              } */}

              {/* {
                !isLoading && isLogin && (
                  <>
                    <IconWrapper>
                      <Icon name='bell' />
                    </IconWrapper>
                  </>
                )
              } */}
              {/* {
                !isLoading && isCustomer && (
                  <Link
                    to={`${urlAdvertiserPrefix}/checkout`}
                    href={`${urlAdvertiserPrefix}/checkout`}
                  >
                    <IconWrapper>
                      <Badge count={count}>
                        <Icon name='shopping cart' />
                      </Badge>
                    </IconWrapper>
                  </Link>
                )
              } */}
            </Row>
          </Col>
        </Row>
      </HeaderWrapper>
    )
  }
}

Headers.propTypes = {
  // setLocale: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleShowSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getUserProfileWithToken: PropTypes.func.isRequired,
  userProfile: PropTypes.instanceOf(Object),
  cart: PropTypes.instanceOf(Iterable),
}

Headers.defaultProps = {
  userProfile: fromJS({}),
  cart: fromJS({}),
}

const mapStateToProps = state => ({
  userProfile: state.getIn(['user', 'user', 'profile']),
  cart: state.getIn(['customer', 'cart']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  // setLocale: localeSelectAction.setLocale,
  fetchMessage: localeSelectAction.fetchMessage,
  getUserProfileWithToken: userAction.getUserProfileWithToken,
  logout: userAction.logout,
  handleLogout: loginAction.handleLogout,
  getCart: cartAction.getCart,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntl,
)(Headers)

// language=SCSS prefix=&{ suffix=}
const ProfileWrapper = styled.section`
    display: inline-block;

    @media (max-width: 400px) {
      display: none;
    }
`

// language=SCSS prefix=&{ suffix=}
const HeaderWrapper = styled.div`
    background: #fff;
    text-transform: uppercase;
    height: 57px;
    padding: 0 50px 0 18px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 3px;

    .ui.grid > .row {
      padding: 12px 0;
    }

    @media (max-width: 400px) {
      padding: 0 18px 0 18px;
    }
`

const Logo = styled.a`
  width: auto;
  text-align: center;

  img {
    height: 50px;
    cursor: pointer;
  }
`

// language=SCSS prefix=&{ suffix=}
const Menu = styled(SemanticMenu)`
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
`

const UserNameSpan = styled.span`
  margin: 0 10px;
  color: #333333;
  cursor: pointer;
`

// language=SCSS prefix=&{ suffix=}
const UserNameWrapper = styled.div`
    flex: 1;
    align-self: flex-end;
    margin-top: 5px;
    text-align: right;
`

// language=SCSS prefix=&{ suffix=}
const UserRoleWrapper = styled.div`
    position: absolute;
    right: 45px;
    top: 0;
`

// language=SCSS prefix=&{ suffix=}
const UserRoleSpan = styled.span`
    font-size: 12px;
    color: #DADDE1;
`

// language=SCSS prefix=&{ suffix=}
const UserWrapper = styled.div`
    width: 100%;
`

// language=SCSS prefix=&{ suffix=}
const IconWrapper = styled.div`
    display: inline-block;
    padding: 0 20px;
    font-size: 1.5em;
    cursor: pointer;
    @media (max-width: 400px) {
      padding: 0 5px;
    }
`

// language=SCSS prefix=&{ suffix=}
const LangSpan = styled.a`
    margin: 0 30px;
    color: #333333;
    cursor: pointer;
    text-transform: uppercase;

    @media (max-width: 400px) {
      display: none;
    }
`

// language=SCSS prefix=&{ suffix=}
const Button = styled.button`
    width: 80px;
    padding-top: 6px;
    padding-bottom: 6px;
    background-color: transparent;
    border-radius: 4px;
    box-shadow: none;
    margin: 0px 4px;
    cursor: pointer;

    &:hover {
      background-color: #e1e1e1;
    }

    @media (max-width: 400px) {
      display: none;
    }
`
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #F37021;
`
// language=SCSS prefix=&{ suffix=}
const SidebarWrapper = styled(IconWrapper)`
    display: none;
    padding: 0px;

    @media (max-width: 400px) {
      display: flex;
    }
`

const Row = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`
