import React, { Fragment, memo } from 'react'
import { FormattedMessage } from 'react-intl'

import { Link } from '~/routes'
import { Menu } from '~/hocs/Layouts/components/Sidebar/Shared'
import { urlAdvertiserPrefix } from '~/config/constants'

const CustomerSidebar = ({ currentPath }) => (
  <Fragment>
    <Link
      route={`${urlAdvertiserPrefix}/planner`}
      href={`${urlAdvertiserPrefix}/planner`}
    >
      <Menu
        link
        active={currentPath === 'planner' || currentPath === 'planners'}
      >
        <FormattedMessage
          id='navbar-customer-planner'
          defaultMessage='Planner'
        />
      </Menu>
    </Link>

    <Link
      route={`${urlAdvertiserPrefix}/bundles`}
      href={`${urlAdvertiserPrefix}/bundles`}
    >
      <Menu
        link
        active={currentPath === 'bundles'}
      >
        <FormattedMessage
          id='navbar-customer-bundles'
          defaultMessage='Bundles'
        />
      </Menu>
    </Link>

    <Link
      route={`${urlAdvertiserPrefix}/products`}
      href={`${urlAdvertiserPrefix}/products`}
    >
      <Menu
        link
        active={currentPath === 'products'}
      >
        <FormattedMessage
          id='navbar-customer-products'
          defaultMessage='Products'
        />
      </Menu>
    </Link>

    {/*<Link*/}
    {/*  route={`${urlAdvertiserPrefix}/dashboard`}*/}
    {/*  href={`${urlAdvertiserPrefix}/dashboard`}*/}
    {/*>*/}
    {/*  <Menu*/}
    {/*    link*/}
    {/*    active={currentPath === 'dashboard'}*/}
    {/*  >*/}
    {/*    <FormattedMessage*/}
    {/*      id='navbar-customer-dashboard'*/}
    {/*      defaultMessage='#Dashboard'*/}
    {/*    />*/}
    {/*  </Menu>*/}
    {/*</Link>*/}

    <Link
      route={`${urlAdvertiserPrefix}/dashboard`}
      href={`${urlAdvertiserPrefix}/dashboard`}
    >
      <Menu
        link
        active={currentPath === 'dashboard'}
      >
        <FormattedMessage
          id='navbar-customer-dashboard'
          defaultMessage='Dashboard'
        />
      </Menu>
    </Link>

    <Link
      route={`${urlAdvertiserPrefix}/orders`}
      href={`${urlAdvertiserPrefix}/orders`}
    >
      <Menu
        link
        active={currentPath === 'orders'}
      >
        <FormattedMessage
          id='navbar-customer-orders'
          defaultMessage='Orders'
        />
      </Menu>
    </Link>
  </Fragment>
)

export default memo(CustomerSidebar)
