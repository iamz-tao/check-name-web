import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withIntl from '~/helpers/withIntl'

// import Paragraph from '~/components/Paragraph'
// import { sagaChecking } from '~/actions'

const About = props => (
  <Fragment>
    {/* <Paragraph>
      <FormattedMessage
        id='greeting_mtm'
        defaultMessage='Hello MTM'
      />
    </Paragraph> */}
      sagaChecking
  </Fragment>
)

export default compose(
  connect(),
  withIntl,
)(About)
