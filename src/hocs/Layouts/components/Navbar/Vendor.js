import React, { Component } from 'react'
import {
  Menu,
  Dropdown,
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Link, Router } from '~/routes'
import { urlVendorPrefix } from '~/config/constants'
import withIntl from '~/helpers/withIntl'

class VendorNavBar extends Component {
  state = {
    currentPath: '',
  }

  componentDidMount() {
    const currentPath = Router
      .router
      .asPath
      .replace(urlVendorPrefix, '')
      .split('/')
      .filter(r => r !== '')[0]

    this.setState({ currentPath })
  }

  render() {
    const { currentPath } = this.state

    return (
      <HeaderWrapper>
        <CustomMenu borderless>
          <Link
            route={`${urlVendorPrefix}/orders`}
            href={`${urlVendorPrefix}/orders`}
          >
            <CustomMenuItem
              link
              actived={(currentPath === 'orders').toString()}
            >
              <FormattedMessage
                id='Orders'
                defaultMessage='Orders'
              />
            </CustomMenuItem>
          </Link>

          <FormattedMessage
            id='Products'
            defaultMessage='Products'
          >
            {
              msg => (
                <CustomDropdown
                  item
                  text={msg}
                  actived={(['products', 'bundles', 'ads-feature'].indexOf(currentPath) > -1).toString()}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        route={`${urlVendorPrefix}/bundles`}
                        href={`${urlVendorPrefix}/bundles`}
                      >
                        <LinkButton>
                          <ItemWrapper>
                            <ItemHeader>
                              <FormattedMessage
                                id='navbar-customer-bundles'
                                defaultMessage='Bundles'
                              />
                            </ItemHeader>
                            <ItemDetail>
                              <FormattedMessage
                                id='bundle-products-for-group-sale'
                                defaultMessage='Bundle products for group sale'
                              />
                            </ItemDetail>
                          </ItemWrapper>
                        </LinkButton>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        route={`${urlVendorPrefix}/products`}
                        href={`${urlVendorPrefix}/products`}
                      >
                        <LinkButton>
                          <ItemWrapper>
                            <ItemHeader>
                              <FormattedMessage
                                id='Products'
                                defaultMessage='Products'
                              />
                            </ItemHeader>
                            <ItemDetail>
                              <FormattedMessage
                                id='product-listing-in-each-media'
                                defaultMessage='Product listing in each media'
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

        </CustomMenu>
      </HeaderWrapper>
    )
  }
}

export default withIntl(VendorNavBar)

const HeaderWrapper = styled.div`
  display: flex;
  height: 52px;
  background: #F37021;
  
  @media screen and (max-width: 800px) {
    display: none;
  }
`
const CustomMenu = styled(Menu)`
  background: #F37021 !important;
  border: none !important;
  box-shadow: none !important;
`
const CustomDropdown = styled(Dropdown)`
  color: white !important;
  font-size: 16px !important;
  ${props => props.actived === 'true' && css`
    background-color: #BB4A06 !important;
  `}

  &:hover {
    background-color: #BB4A06 !important;
  }
`
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const ItemHeader = styled.span`
  font-size: 16px;
  margin: 0px 0px 5px 0px;
`
const ItemDetail = styled.span`
  font-size: 14px;
  color: #929598;
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
`
