import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, injectIntl, addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import thLocaleData from 'react-intl/locale-data/th'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import Cookie from 'js-cookie'

// import * as localeActions from '~/modules/locale/actions'
// import * as localeSelectors from '~/modules/locale/selectors'

addLocaleData([...enLocaleData, ...thLocaleData])
export default (ComposedComponent) => {
  const IntlPage = injectIntl(ComposedComponent)

  const PageWithIntl = (class extends Component {
    static propTypes = {
      locale: PropTypes.string.isRequired,
      messages: PropTypes.shape({ root: PropTypes.string.isRequired }).isRequired,
    }

    static async getInitialProps(ctx) {
      let composedProps = {}
      if (ComposedComponent.getInitialProps) {
        composedProps = await ComposedComponent.getInitialProps({
          ...ctx,
        })
      }

      return composedProps
    }

    componentDidMount() {
      const locale = Cookie.get('lang') || 'th'
      const { dispatch } = this.props
      // dispatch(localeActions.fetchMessage(locale))
    }

    render() {
      const { locale, messages, ...props } = this.props
      return (
        <IntlProvider
          locale={locale}
          messages={messages}
        >
          <IntlPage {...props} />
        </IntlProvider>
      )
    }
  })

  const mapStateToProps = state => createStructuredSelector({
    locale: localeSelectors.selectLocale,
    messages: localeSelectors.selectMessages,
  })(state)

  PageWithIntl.propTypes = {
    messages: PropTypes.instanceOf(Object).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  return connect(mapStateToProps)(PageWithIntl)
}
