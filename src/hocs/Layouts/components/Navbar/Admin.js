import React, { PureComponent } from 'react'
import {
  Menu,
  Dropdown,
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Link, Router } from '~/routes'
import { urlAdminPrefix } from '~/config/constants'
import withIntl from '~/helpers/withIntl'

class AdminVendor extends PureComponent {
  state = {
    currentPath: '',
  }

  componentDidMount() {
    const currentPath = Router
      .router
      .asPath
      .replace(urlAdminPrefix, '')
      .split('/')
      .filter(r => r !== '')[0]

    this.setState({ currentPath })
  }

  render() {
    const { currentPath } = this.state

    return (
      <HeaderWrapper>
        <CustomMenu borderless>
          <FormattedMessage
            id='Orders'
            defaultMessage='Orders'
          >
            {
              msg => (
                <CustomDropdown
                  item
                  text={msg}
                  actived={(['orders'].indexOf(currentPath) > -1).toString()}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        route={`${urlAdminPrefix}/payment-approval`}
                        href={`${urlAdminPrefix}/payment-approval`}
                      >
                        <LinkButton>
                          <ItemWrapper>
                            <ItemHeader>
                              <FormattedMessage
                                id='payment-approval'
                                defaultMessage='Payment Approval'
                              />
                            </ItemHeader>
                            <ItemDetail>
                              <FormattedMessage
                                id='this-is-description'
                                defaultMessage='This is description'
                              />
                            </ItemDetail>
                          </ItemWrapper>
                        </LinkButton>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Link
                        route={`${urlAdminPrefix}/proof-approval`}
                        href={`${urlAdminPrefix}/proof-approval`}
                      >
                        <LinkButton>
                          <ItemWrapper>
                            <ItemHeader>
                              <FormattedMessage
                                id='proof-approval'
                                defaultMessage='Proof Approval'
                              />
                            </ItemHeader>
                            <ItemDetail>
                              <FormattedMessage
                                id='this-is-description'
                                defaultMessage='This is description'
                              />
                            </ItemDetail>
                          </ItemWrapper>
                        </LinkButton>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Link
                        route={`${urlAdminPrefix}/report-approval`}
                        href={`${urlAdminPrefix}/report-approval`}
                      >
                        <LinkButton>
                          <ItemWrapper>
                            <ItemHeader>
                              <FormattedMessage
                                id='report-approval'
                                defaultMessage='Report Approval'
                              />
                            </ItemHeader>
                            <ItemDetail>
                              <FormattedMessage
                                id='this-is-description'
                                defaultMessage='This is description'
                              />
                            </ItemDetail>
                          </ItemWrapper>
                        </LinkButton>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </CustomDropdown>
              )
            }
          </FormattedMessage>

          <FormattedMessage
            id='Products'
            defaultMessage='Products'
          >
            {
              msg => (
                <CustomDropdown
                  item
                  text={msg}
                  actived={(['ads-types', 'feature'].indexOf(currentPath) > -1).toString()}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        route={`${urlAdminPrefix}/feature`}
                        href={`${urlAdminPrefix}/feature`}
                      >
                        <LinkButton>
                          <ItemWrapper>
                            <ItemHeader>
                              <FormattedMessage
                                id='ads-feature'
                                defaultMessage='Ads Feature'
                              />
                            </ItemHeader>
                          </ItemWrapper>
                        </LinkButton>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Link
                        route={`${urlAdminPrefix}/ads-types`}
                        href={`${urlAdminPrefix}/ads-types`}
                      >
                        <LinkButton>
                          <ItemWrapper>
                            <ItemHeader>
                              <FormattedMessage
                                id='ads-types'
                                defaultMessage='Ads Types'
                              />
                            </ItemHeader>
                          </ItemWrapper>
                        </LinkButton>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </CustomDropdown>
              )
            }
          </FormattedMessage>

          <Link
            route={`${urlAdminPrefix}/users`}
            href={`${urlAdminPrefix}/users`}
          >
            <CustomMenuItem
              link
              actived={(currentPath === 'users').toString()}
            >
              <FormattedMessage
                id='users'
                defaultMessage='Users'
              />
            </CustomMenuItem>
          </Link>

          <Link
            route={`${urlAdminPrefix}/companies`}
            href={`${urlAdminPrefix}/companies`}
          >
            <CustomMenuItem
              link
              actived={(currentPath === 'companies').toString()}
            >
              <FormattedMessage
                id='company'
                defaultMessage='Company'
              />
            </CustomMenuItem>
          </Link>
        </CustomMenu>
      </HeaderWrapper>
    )
  }
}

export default withIntl(AdminVendor)

const HeaderWrapper = styled.div`
  display: flex;
  height: 52px;
  background: ${props => props.theme.colors.adminNavbar};
  
  @media screen and (max-width: 800px) {
    display: none;
  }
`
const CustomMenu = styled(Menu)`
  background: ${props => props.theme.colors.adminNavbar} !important;
  border: none !important;
  box-shadow: none !important;
`
const CustomDropdown = styled(Dropdown)`
  color: white !important;
  font-size: 16px !important;
  ${props => props.actived === 'true' && css`
    background-color: ${props.theme.colors.adminActive} !important;
  `}

  &:hover {
    background-color: ${props => props.theme.colors.adminActive} !important;
  }
`
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const ItemHeader = styled.span`
  font-size: 16px;
  margin: 0 0 5px 0;
`

const LinkButton = styled.a`
  color: black;

  :hover {
    color: black;
  }
`

const CustomMenuItem = styled(Menu.Item)`
  color: white !important;
  font-size: 16px !important;
  
  ${props => props.actived === 'true' && css`
    background-color: ${props.theme.colors.adminActive} !important;
  `}

  &:hover {
    background-color: ${props => props.theme.colors.adminActive} !important;
  }
`
const ItemDetail = styled.span`
  font-size: 14px;
  color: #929598;
`
