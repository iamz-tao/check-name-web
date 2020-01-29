import React, { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import ExpertConsult from '~/static/images/expert-consult.svg'
import { Link, Router } from '~/routes'
import { urlAdvertiserPrefix } from '~/config/constants'

const CustomerNavbar = () => {
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    const path = Router
      .router
      .asPath
      .replace(urlAdvertiserPrefix, '')
      .split('/')
      .filter(r => r !== '')[0]

    setCurrentPath(path)
  }, [])
  return (
    <HeaderWrapper>
      <CustomMenu borderless>
        <Link
          route='/planner'
          href='/planner'
        >
          <CustomMenuItem
            link
            active={currentPath === 'planner' || currentPath === 'planners'}
          >
            <FormattedMessage
              id='navbar-customer-planner'
              defaultMessage='Planner'
            />
          </CustomMenuItem>
        </Link>

        <Link
          route='/bundles'
          href='/bundles'
        >
          <CustomMenuItem
            link
            active={currentPath === 'bundles'}
          >
            <FormattedMessage
              id='navbar-customer-bundles'
              defaultMessage='Bundles'
            />
          </CustomMenuItem>
        </Link>

        <Link
          route='/products'
          href='/products'
        >
          <CustomMenuItem
            link
            active={currentPath === 'products'}
          >
            <FormattedMessage
              id='navbar-customer-products'
              defaultMessage='Products'
            />
          </CustomMenuItem>
        </Link>

        {/*<Link*/}
        {/*  route='/adsitems'*/}
        {/*  href='/adsitems'*/}
        {/*>*/}
        {/*  <CustomMenuItem*/}
        {/*    link*/}
        {/*    active={currentPath === 'adsitems'}*/}
        {/*  >*/}
        {/*    <FormattedMessage*/}
        {/*      id='ads-items'*/}
        {/*      defaultMessage='#Ads Items'*/}
        {/*    />*/}
        {/*  </CustomMenuItem>*/}
        {/*</Link>*/}

        {/*<Link*/}
        {/*  route='/dashboard'*/}
        {/*  href='/dashboard'*/}
        {/*>*/}
        {/*  <CustomMenuItem*/}
        {/*    link*/}
        {/*    active={currentPath === 'dashboard'}*/}
        {/*  >*/}
        {/*    <FormattedMessage*/}
        {/*      id='navbar-customer-dashboard'*/}
        {/*      defaultMessage='#Dashboard'*/}
        {/*    />*/}
        {/*  </CustomMenuItem>*/}
        {/*</Link>*/}
        <Link
          route='/dashboard'
          href='/dashboard'
        >
          <CustomMenuItem
            link
            active={currentPath === 'dashboard'}
          >
            <FormattedMessage
              id='navbar-customer-dashboard'
              defaultMessage='Dashboard'
            />
          </CustomMenuItem>
        </Link>

        <Link
          route='/orders'
          href='/orders'
        >
          <CustomMenuItem
            link
            active={currentPath === 'orders'}
          >
            <FormattedMessage
              id='navbar-customer-orders'
              defaultMessage='Orders'
            />
          </CustomMenuItem>
        </Link>

      </CustomMenu>
      <CustomMenu borderless>
        <Link
          route={`${urlAdvertiserPrefix}/consultant`}
          href={`${urlAdvertiserPrefix}/consultant`}
        >
          <CustomMenuItem
            link
            active={currentPath === 'consultant'}
          >
            <ConsultExpertLink>
              <ConsultIconWrapper>
                <ExpertConsult />
                <span>
                  <FormattedMessage
                    id='navbar-customer-expert-consultant'
                    defaultMessage='Expert’s consultant'
                  />
                </span>
              </ConsultIconWrapper>
            </ConsultExpertLink>
          </CustomMenuItem>
        </Link>
      </CustomMenu>
    </HeaderWrapper>
  )
}

export default CustomerNavbar

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin: 0px !important;
`
const CustomMenuItem = styled(Menu.Item)`
  color: white !important;
  font-size: 16px !important;
`

const ConsultExpertLink = styled.a`
  color: white;
  display: flex;
  align-items: center;
  font-style: italic;
  font-size: 16px;

  span{
    display: flex;
    position: relative;
    margin-left: 8px;
  }
  
  :hover {
    color: white;
  }

  path {
    fill: white;
  }
`
const ConsultIconWrapper = styled.div`
  display: flex;

  svg {
    height: 22px;
    width: 24px;
  }
`
