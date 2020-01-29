import React, { Component } from 'react'

export default (ComposedComponent) => {
  const withAuth = () => class extends Component {
    // static async getInitialProps(ctx) {
    //   const token = getTokenFromCookie(ctx.req)
    //   const user = getUserFromCookie(ctx.req)
    //   const isAuthenticated = !!token && !!user

    //   const authProps = { token, user, isAuthenticated }
    //   let composedProps = null

    //   if (ComposedComponent.getInitialProps) {
    //     composedProps = await ComposedComponent.getInitialProps({
    //       ...ctx,
    //       ...authProps,
    //     })
    //   }

    //   return { ...composedProps, ...authProps }
    // }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return withAuth()
}
