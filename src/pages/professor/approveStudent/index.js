import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { notification } from 'antd'

import FilterAndCriteria from './components/FilterAndCriteria'
import ListStudent from './components/ListStudent'

import LoadingPulse from '~/components/LoadingPulse'
import HeaderAdmin from '~/components/HeaderNavbar/Admin'

import withLayout from '~/hocs/Layouts/withLayout'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearSelector } from '~/modules/admin/selectors'
import { yearAction } from '~/modules/admin/actions'

class ApproveStudent extends Component {
  state = {
    subjects: null,
    filter: {
      subject: '',
      section: '',
    },
    selectedRowKeys: [],
    loading: false,
  }

  componentDidMount() {
    const { getCurrentYear, getSubjects } = this.props
    getCurrentYear()
    getSubjects()
  }

  start = () => {
    this.setState({ loading: true })
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      })
    }, 1000)
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  handleApprove = (id) => {
    console.log('sss',id)
    // const {
    //   subject_id,
    // } = id
    // const {
    //   approveSubject,
    // } = this.props
    // approveSubject({ subject_id })
    this.openNotificationApproveSuccess('success')
  }

  handleReject = (id) => {
    console.log('iedddd',id)
    // const {
    //   student_id,
    // } = id
    // const {
    //   rejectStudent,
    // } = this.props
    // rejectStudent({ student_id })
    this.openNotificationRejectSuccess('success')
  }

  handleApproveSubjects = (status) => {
    console.log('stausss',status)
    // const {
    //   selectedRowKeys,
    // } = this.state

    // const {
    //   approveStudents,
    //   rejectStudents,
    // } = this.props

    // const data = { approve_ids: selectedRowKeys }

    // if (status === 'A') {
    //   approveStudents({ data })
    //   this.openNotificationApproveSuccess('success')
    // }
    // if (status === 'R') {
    //   rejectStudents({ data })
    //   this.openNotificationRejectSuccess('success')
    // }
  }


  handleInputChange = async (e, { value }) => {
    const { filter } = this.state
    await this.setState({
      filter: {
        ...filter,
        subject: value,
      },
    })
  }


  handleInputChangeSection = async (e, { value }) => {
    const { filter } = this.state
    await this.setState({
      filter: {
        ...filter,
        section: value,
      },
    })
  }


  handleResetFilter = () => {
    this.setState({
      filter: {
        section: '',
        subject: '',
      },
    })
  }

  handleFilter = () => {
    const { currentYear, getStudentApprove } = this.props
    const { subject, section } = this.state.filter
    const year = currentYear.get('year')
    const semester = currentYear.get('semester')

    getStudentApprove({
      year: Math.trunc(year),
      semester,
      subject_name: subject,
      section_number: section,
    })
  }

  openNotificationRejectSuccess = (type) => {
    notification[type]({
      message: 'Reject Success!',
      description:
        'Action completed successfully.',
    })
  }

  openNotificationApproveSuccess = (type) => {
    notification[type]({
      message: 'Approve Success!',
      description:
        'Action completed successfully.',
    })
  }


  render() {
    const {
      students,
      allSection,
      currentYear,
    } = this.props

    const {
      filter,
    } = this.state

    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0

    return (
      <PageWrapper>
        <HeaderAdmin />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria
              allSection={allSection}
              handleInputChange={this.handleInputChange}
              handleInputChangeSection={this.handleInputChangeSection}
              handleFilter={this.handleFilter}
              handleResetFilter={this.handleResetFilter}
              filter={filter}
              currentYear={currentYear}
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
                {
                    currentYear === null && (
                      <LoadingPulse />
                    )
                  }
                {
                    students !== null && students.size > 0 && (
                    <ListCol>
                      <ListStudent
                        start={this.start}
                        hasSelected={hasSelected}
                        loading={loading}
                        selectedRowKeys={selectedRowKeys}
                        rowSelection={rowSelection}
                        students={students}
                        allSection={allSection && allSection.toJS()}
                        handleApprove={this.handleApprove}
                        handleReject={this.handleReject}
                        handleApproveSubjects={this.handleApproveSubjects}
                      />
                    </ListCol>
                    )
                  }

                {
                    currentYear !== null && students === null && (
                        <RowContainerNotFound>
                          <NotFoundWrapper>
                            <h1>
                              SEARCH YOUR SUBJECT FOR APPROVE STUDENT.
                            </h1>
                          </NotFoundWrapper>
                        </RowContainerNotFound>
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
  subjects: subjectsSelector.getSubjects,
  allSection: subjectsSelector.getSubjectsProfessor,
  currentYear: yearSelector.getCurrentYear,
  students: subjectsSelector.getStudentApprove,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubjects: subjectAction.getSubjectsProfessor,
  approveSubject: subjectAction.approveSubject,
  rejectSubject: subjectAction.rejectSubject,
  approveSubjects: subjectAction.approveSubjects,
  rejectSubjects: subjectAction.rejectSubjects,
  getCurrentYear: yearAction.getCurrentYear,
  getStudentApprove: subjectAction.getStudentsSection,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(ApproveStudent)

const PageWrapper = styled.div`
  font-family: kanit;
  position: relative;
  .ant-modal-confirm-body .ant-modal-confirm-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    font-family: kanit;
  }
`

const RowContainer = styled.div`
  display: flex;
  padding: 0px 32px;
  flex: 1;
  justify-content: center;
  padding-left: 42px;
  margin-top: 22px;
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
  margin-top: 22px;

  @media (max-width: 1024px) {
    position: absolute;
    transform: translate(-500%, 0px);
  }
`
const Space = styled.div`
  /* height: 20px; */
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
