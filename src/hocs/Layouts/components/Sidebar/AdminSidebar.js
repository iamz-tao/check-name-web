import React, { Fragment, memo } from 'react'
import { FormattedMessage } from 'react-intl'

import { Link } from '~/routes'
import { Menu } from '~/hocs/Layouts/components/Sidebar/Shared'
import { urlAdminPrefix } from '~/config/constants'

const CustomerSidebar = ({ currentPath }) => (
  <Fragment>
    <Menu>
      <FormattedMessage
        id='orders'
        defaultMessage='Orders'
      />
      <ul>
        <Link
          route='#'
          href="#"
        >
          <li>
            <FormattedMessage
              id='payment-approval'
              defaultMessage='Payment Approval'
            />
          </li>
        </Link>
        </ul>
    </Menu>
  </Fragment>
)

export default memo(CustomerSidebar)
