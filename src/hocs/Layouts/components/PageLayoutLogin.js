import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  Sidebar as SemanticSidebar,
} from 'semantic-ui-react'

import Header from '~/hocs/Layouts/components/Header'

class PageLayoutLogin extends PureComponent {
  state = {
    visible: false,
  }

  handleHideSidebar = () => this.setState({ visible: false })

  handleShowSidebar = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state
    const { children } = this.props
    return (
      <App>
        {/* <Sidebar.Pusher dimmed={visible}> */}
          <AppWrapper>
            <Header handleShowSidebar={this.handleShowSidebar} />
            <BodyWrapper>
              {children}
            </BodyWrapper>
          </AppWrapper>
        {/* </Sidebar.Pusher> */}
      </App>
    )
  }
}

PageLayoutLogin.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state, props) => createStructuredSelector({})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PageLayoutLogin)

// language=SCSS prefix=&{ suffix=}
const App = styled.div`
    padding: 0;
    margin: 0;
    font-family: Kanit !important;
    background-color: #f1f1f1;
    min-height: 100vh;
    overflow: hidden;
`

// language=SCSS prefix=&{ suffix=}
const AppWrapper = styled.div`
    z-index: 2;
    position: relative;
    min-height: 100vh;
`

// language=SCSS prefix=&{ suffix=}
const BodyWrapper = styled.div`
    min-height: calc(100vh - 320px);

    .ui.grid {
      margin: 0;
    }
`

const Sidebar = styled(SemanticSidebar)`
  background: white !important;
  display: none !important;
  @media (max-width: 400px) {
    display: flex !important;
  }
`
