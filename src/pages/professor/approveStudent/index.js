import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { notification } from 'antd'

import FilterAndCriteria from './components/FilterAndCriteria'
import ListStudent from './components/ListStudent'
import ListAllStudent from './components/ListAllStudent'

import LoadingPulse from '~/components/LoadingPulse'
import HeaderProfessor from '~/components/HeaderNavbar/Professor'

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
    search: false,
    selectedRowKeys: [],
    loading: false,
    allStudentsApproveState: null,
  }

  componentDidMount() {
    const { getCurrentYear, getSubjects, getAllStudentsApprove } = this.props
    getCurrentYear()
    getSubjects()
    getAllStudentsApprove()
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

  handleApprove = (id, type) => {
    const {
      approveStudent,
    } = this.props
    const data = {
      id: [id.id],
      type,
    }
    approveStudent(data)
    this.openNotificationApproveSuccess('success')
  }

  handleReject = (id) => {
    const {
      rejectStudent,
    } = this.props
    rejectStudent({ id: [id.id] })
    this.openNotificationRejectSuccess('success')
  }

  handleApproveSubjects = (status, type) => {
    const {
      selectedRowKeys,
    } = this.state

    const {
      approveStudent,
      rejectStudent,
    } = this.props

    const id = { id: selectedRowKeys }
    const data = {
      id,
      type,
    }
    if (status === 'A') {
      approveStudent(data)
      this.openNotificationApproveSuccess('success')
    }
    if (status === 'R') {
      rejectStudent({ id }, type)
      this.openNotificationRejectSuccess('success')
    }
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
    const { search } = this.state
    this.setState({
      filter: {
        section: '',
        subject: '',
      },
      search: !search,
      allStudentsApproveState: null,
    })
    const { getAllStudentsApprove } = this.props
    getAllStudentsApprove()
  }

  handleFilter = () => {
    const { currentYear, getStudentApprove } = this.props
    const { search } = this.state
    const { subject, section } = this.state.filter
    const year = currentYear.get('year')
    const semester = currentYear.get('semester')

    getStudentApprove({
      year: Math.trunc(year),
      semester,
      subject_name: subject,
      section_number: section,
    })
    this.setState({
      search: !search,
    })
  }

  openNotificationRejectSuccess = (type) => {
    notification[type]({
      message: 'Reject Succeeded!',
      description:
        'Action completed successfully.',
    })
  }

  openNotificationApproveSuccess = (type) => {
    notification[type]({
      message: 'Approve Succeeded!',
      description:
        'Action completed successfully.',
    })
  }

  sortItem = (sort_by) => {
    const { allStudentsApprove } = this.props
    let dataSort = []
    if (sort_by === 'std_id' || sort_by === 'subject_code') {
      dataSort = allStudentsApprove.sort((a, b) => (a.get(sort_by).toUpperCase() - b.get(sort_by).toUpperCase()))
    }
    if (sort_by === 'firstname') {
      dataSort = allStudentsApprove.sort((c, b) => c.get(sort_by).localeCompare(b.get(sort_by)))
    }
    this.setState({
      allStudentsApproveState: dataSort,
    })
  }


  render() {
    const {
      students,
      allSection,
      currentYear,
      allStudentsApprove,
    } = this.props

    const {
      filter,
      search,
      allStudentsApproveState,
    } = this.state

    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0

    return (
      <PageWrapper>
        <HeaderProfessor />
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
          <RowContainer style={{ paddingTop: 0, marginBottom: '24px' }}>
            <ListCol
              style={{
                position: 'relative',
              }}
            >

              <Fragment>
                <Space />
                {
                    currentYear === null && allStudentsApprove === null && (
                      <LoadingPulse />
                    )
                  }
                {
                    search === true && allStudentsApprove !== null && allStudentsApprove.size > 0 && (
                    <ListCol>
                      <ListStudent
                        filter={filter}
                        sortItem={this.sortItem}
                        start={this.start}
                        hasSelected={hasSelected}
                        loading={loading}
                        selectedRowKeys={selectedRowKeys}
                        rowSelection={rowSelection}
                        students={allStudentsApproveState === null ? allStudentsApprove : allStudentsApproveState}
                        allSection={allSection && allSection.toJS()}
                        handleApprove={this.handleApprove}
                        handleReject={this.handleReject}
                        handleApproveSubjects={this.handleApproveSubjects}
                      />
                    </ListCol>
                    )
                  }
                {
                     search === false && allStudentsApprove !== null && allStudentsApprove !== undefined && allStudentsApprove.size > 0 && (
                     <ListCol>
                       <ListAllStudent
                         sortItem={this.sortItem}
                         start={this.start}
                         hasSelected={hasSelected}
                         loading={loading}
                         selectedRowKeys={selectedRowKeys}
                         rowSelection={rowSelection}
                         students={allStudentsApproveState === null ? allStudentsApprove : allStudentsApproveState}
                         allSection={allSection && allSection.toJS()}
                         handleApprove={this.handleApprove}
                         handleReject={this.handleReject}
                         handleApproveSubjects={this.handleApproveSubjects}
                       />
                     </ListCol>
                     )
                  }
                {
                    currentYear !== null && allStudentsApprove === undefined || allStudentsApprove !== null && allStudentsApprove.size === 0 && (
                      <RowContainerNotFound>
                        <NotFoundWrapper>
                          <h1>
                            There isn&apos;t student waiting for approval.
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
  allSection: subjectsSelector.getSectionsTeach,
  currentYear: yearSelector.getCurrentYear,
  students: subjectsSelector.getStudentApprove,
  allStudentsApprove: subjectsSelector.getAllStudentsApprove,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubjects: subjectAction.getListSectionsTeacher,
  approveStudent: subjectAction.approveStudent,
  rejectStudent: subjectAction.rejectStudent,
  getCurrentYear: yearAction.getCurrentYear,
  getStudentApprove: subjectAction.getStudentsSection,
  getAllStudentsApprove: subjectAction.getAllStudentsApprove,
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
