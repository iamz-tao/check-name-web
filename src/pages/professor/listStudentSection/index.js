import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import FilterAndCriteria from './components/FilterAndCriteria'
import StudentLists from './components/ListStudents'

import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'

import withLayout from '~/hocs/Layouts/withLayout'
import { Router } from '~/routes'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'


const TableHeader = () => (
  <Wrapper>
    <Header>
      SUBJECT: 02204236 Test Permission
    </Header>
    <Header style={{ paddingBottom: '16px' }}>
      SECTION NUMBER: 711
    </Header>
    <Row>
      <UserDetailGroup>
        <ListHeader>
          <ItemHeader>
            STUDENT ID
          </ItemHeader>
        </ListHeader>
        <ListHeader>
          <ItemHeader>
            STUDENT NAME
          </ItemHeader>
        </ListHeader>
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

class ListStudents extends Component {
  state = {
    students: null,
    filter: {
      keyword: '',
    },
  }

  componentDidMount() {
    const { query: { id } } = Router
    // console.log('xxxxx', id)
  }

  fetch = () => {
    // const { filter } = this.state
    // const { getSubjects } = this.props
    // getSubjects({
    //   filter: {
    //     ...filter,
    //   },
    // })
  }


  handleInputChange = async ({ target }) => {
    await this.setState(state => ({
      ...state,
      filter: {
        ...state.filter,
        [target.name]: target.value,
      },
    }))
    this.fetch()
  }

  handleResetFilter = () => {
    // this.setState({
    //   filter: {
    //     user_role: [],
    //     keyword: '',
    //   },
    // })
  }


  render() {
    const {
      // students,
    } = this.props

    const {
      filter,
    } = this.state

    const students = [{
      name: 'xxxxx',
      surname: 'sssssss',
      status: 'APPROVE',
    },
    {
      name: 'xxxxx',
      surname: 'sssssss',
      status: 'APPROVE',
    }]

    return (
      <PageWrapper>
        <HeaderProfessor />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria
              filter={filter}
              handleInputChange={this.handleInputChange}
              handleResetFilter={this.handleResetFilter}
            />
          </FilterWrapper>
          <RowContainer style={{ paddingTop: 0 }}>
            <ListCol
              style={{
                position: 'relative',
              }}
            >
              <Fragment>
                <Space />
                {/* {
                    students === null && (
                      <LoadingPulse />
                    )
                  } */}
                {/* {
                    students !== null && students.size > 0 && ( */}
                <ListCol>
                  <TableHeader />
                  <ListCol>
                    <StudentLists
                      students={students}
                      filter={filter}
                    />
                  </ListCol>
                </ListCol>
                {/* )
                  } */}

                {/* {
                    students !== null && students.size === 0 && (
                      <NotFound />
                    )
                  } */}
              </Fragment>
            </ListCol>
          </RowContainer>
        </RowContainer>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
//   subjects: subjectsSelector.getSubjectsProfessor,
//   currentYear: yearSelector.getCurrentYear,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
//   getSections: subjectAction.getSubjectsProfessor,
//   getSection: subjectAction.getSection,
//   getCurrentYear: yearAction.getCurrentYear,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(ListStudents)

const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
  .ant-modal-confirm-body .ant-modal-confirm-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    font-family: kanit;
  }
`

const ItemHeader = styled.span`
    font-family: kanit;
    font-size: 18px;
    margin: 0;
    color: black;
    cursor: pointer;
`
const Header = styled.span`
    font-family: kanit;
    font-size: 22px;
    font-weight: 500;
    margin: 0;
    color: #554d4d;
`

const OtherWrapper = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`

const RowContainer = styled.div`
  display: flex;
  padding: 0px 32px;
  flex: 1;
  justify-content: center;
  padding-left: 42px;
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
  margin-top: 50px;

  @media (max-width: 1024px) {
    position: absolute;
    transform: translate(-500%, 0px);
  }
`
const Space = styled.div`
  height: 56px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0px 0px 16px 0px;
`

const ListHeader = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 35px;
  text-align: left;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32%;
  width: 100%;
`
const UserDetailGroup = styled.div`
  display: flex;
  color: #929598;
  font-size: 16px;
  flex: 3;
`
