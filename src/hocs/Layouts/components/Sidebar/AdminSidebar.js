import React, { Fragment, memo } from 'react'
import { FormattedMessage } from 'react-intl'

import { Link } from '~/routes'
import { Menu } from '~/hocs/Layouts/components/Sidebar/Shared'
import { urlVendorPrefix } from '~/config/constants'

const CustomerSidebar = ({ currentPath }) => (
  <Fragment>
    <Link
      route={`${urlVendorPrefix}/orders`}
      href={`${urlVendorPrefix}/orders`}
    >
      <Menu
        link
        actived={(currentPath === 'orders').toString()}
      >
        <FormattedMessage
          id='orders'
          defaultMessage='Orders'
        />
      </Menu>
    </Link>

    <Menu
      submenu
      childrenHeight={100}
      actived={(['products', 'bundles', 'ads-feature'].indexOf(currentPath) > -1).toString()}
    >
      Products
      <ul>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <Link
          route={`${urlVendorPrefix}/bundles`}
          href={`${urlVendorPrefix}/bundles`}
        >
          <li>
            Bundles
          </li>
        </Link>

        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <Link
          route={`${urlVendorPrefix}/products`}
          href={`${urlVendorPrefix}/products`}
        >
          <li>
            Products
          </li>
        </Link>
      </ul>
    </Menu>

    {/*<Link*/}
    {/*  route={`${urlVendorPrefix}/promotion`}*/}
    {/*  href={`${urlVendorPrefix}/promotion`}*/}
    {/*>*/}
    {/*  <Menu*/}
    {/*    link*/}
    {/*    active={currentPath === 'promotion'}*/}
    {/*  >*/}
    {/*    Promotion*/}
    {/*  </Menu>*/}
    {/*</Link>*/}

    {/*<Link*/}
    {/*  route={`${urlVendorPrefix}/companies`}*/}
    {/*  href={`${urlVendorPrefix}/companies`}*/}
    {/*>*/}
    {/*  <Menu*/}
    {/*    link*/}
    {/*    active={currentPath === 'companies'}*/}
    {/*  >*/}
    {/*    Company*/}
    {/*  </Menu>*/}
    {/*</Link>*/}
  </Fragment>
)

export default memo(CustomerSidebar)
