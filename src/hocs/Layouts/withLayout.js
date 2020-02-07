import React, { Component } from 'react'
import Layout from '~/hocs/Layouts/components/PageLayout'

export default (ComposedComponent) => {
  const WithLayout = class extends Component {
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
      // if (!window.GA_INITIALIZED) {
      //   initGA()
      //   window.GA_INITIALIZED = true
      // }
      // logPageView()
    }

    render = () => (
      <Layout {...this.props}>
        <ComposedComponent {...this.props} />
      </Layout>
    )
  }

  return WithLayout
}
