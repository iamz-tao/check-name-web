import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Menu,
  Dropdown,
} from 'semantic-ui-react'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'

import FilterAndCriteria from './components/FilterAndCriteria'

import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import withLayout from '~/hocs/Layouts/withLayout'
import { Link, Router } from '~/routes'

class HomePageProfessor extends Component {
  state = {
    subjects: '',
  }

  render() {
    return (
      <PageWrapper>
        <HeaderProfessor />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria />
          </FilterWrapper>
          <RowContainer style={{ paddingTop: 0 }}>
            {/* <ListCol
              style={{
                position: 'relative',
              }}
            /> */}
            <RowContainerNotFound>
              <NotFoundWrapper>
                <h1>
                  SEARCH YOUR SUBJECT BY YEAR AND SEMESTER.
                </h1>
              </NotFoundWrapper>
            </RowContainerNotFound>
          </RowContainer>
        </RowContainer>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(HomePageProfessor)


const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
`

const RowContainer = styled.div`
  display: flex;
  padding: 41px 46px;;
  flex: 1;
  justify-content: center;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const ListCol = styled(Col)`
  flex: 1;
  .ui.dropdown > .text {
    color: #00a699;
  }
`

const FilterWrapper = styled(Col)`
  transition: 0.5s;

  @media (max-width: 1024px) {
    position: absolute;
    transform: translate(-500%, 0px);
  }
`
const NotFoundWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;

    > h1 {
      font-size: 2em;
      color: #929598;
    }
`

const RowContainerNotFound = styled.div`
  display: flex;
  padding: 20px;
  flex: 1;
`
