import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
import FilterAndCriteria from './components/FilterAndCriteria'
import StudentLists from './components/ListStudents'

import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'

import withLayout from '~/hocs/Layouts/withLayout'
import { Router } from '~/routes'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'


const TableHeader = ({ subject_code, subject_name, section }) => (
  <Wrapper>
    <Header>
      SUBJECT:
      {' '}
      {subject_code}
      {' '}
      {subject_name}
    </Header>
    <Header style={{ paddingBottom: '16px' }}>
      SECTION NUMBER:
      {' '}
      {section}
    </Header>
    <Row>
      <UserDetailGroup>
        <ListHeader>
          <ItemHeader>
            STUDENT ID
          </ItemHeader>
        </ListHeader>
        <ListHeader style={{ flex: '3' }}>
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
    const { getStudents } = this.props
    getStudents({ id })
  }


  handleInputChange = async ({ target }) => {
    await this.setState(state => ({
      ...state,
      filter: {
        ...state.filter,
        [target.name]: target.value,
      },
    }))
  }

  handleResetFilter = () => {
    this.setState({
      filter: {
        keyword: '',
      },
    })
  }


  render() {
    const {
      students,
    } = this.props

    const {
      filter,
    } = this.state

    let subject_code = '-'
    let subject_name = '-'
    let section = '-'
console.log(students && students.toJS())
    if (students) {
      subject_code = students.getIn([0, 'subject_code'])
      subject_name = students.getIn([0, 'subject_name'])
      section = students.getIn([0, 'section_number'])
    }
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
          <RowContainer style={{ paddingTop: 0, marginBottom: '24px' }}>
            <ListCol
              style={{
                position: 'relative',
              }}
            >
              <Fragment>
                <Space />
                {
                    students === null && (
                      <LoadingPulse />
                    )
                  }
                {/* {
                    students !== null && students.size > 0 && (
                    <ListCol>
                      <TableHeader
                        subject_code={subject_code}
                        subject_name={subject_name}
                        section={section}
                      />
                      <ListCol>
                        <StudentLists
                          students={students}
                          filter={filter}
                        />
                      </ListCol>
                      <ButtonWrapper>
                          <Button type='dashed' size='large' onClick={() => Router.push('/professor')}>
                            BACK
                          </Button>
                        </ButtonWrapper>
                    </ListCol>
                    )
                  } */}

                {
                    students !== null && students.size === 0 && (
                      <div>
                        <NotFound />

                        <ButtonWrapper>
                          <Button type='dashed' size='large' onClick={() => Router.push('/professor')}>
                            BACK
                          </Button>
                        </ButtonWrapper>
                      </div>
                    )
                  }

              </Fragment>
            </ListCol>
          </RowContainer>
        </RowContainer>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  students: subjectsSelector.studentInSection,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getStudents: subjectAction.getStudentsInSection,
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

  .ant-btn-dashed {
    width: 86px;
    border-radius: 24px;
    margin-top: 16px;
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
  flex: 2;
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
