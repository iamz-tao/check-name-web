import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { notification } from 'antd'

import FilterAndCriteria from './components/FilterAndCriteria'
import ListSubject from './components/ListSubject'

import LoadingPulse from '~/components/LoadingPulse'
import HeaderAdmin from '~/components/HeaderNavbar/Admin'

import withLayout from '~/hocs/Layouts/withLayout'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'


class AdminApprove extends Component {
  state = {
    subjects: null,
    filter: {
      year: [],
      keyword: '',
    },
    selectedRowKeys: [],
    loading: false,
    subjectsState: null,
  }

  componentDidMount() {
    const { getSubjects } = this.props
    getSubjects({})
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
    const {
      subject_id,
    } = id
    const {
      approveSubject,
    } = this.props
    approveSubject({ subject_id })
    this.openNotificationApproveSuccess('success')
  }

  handleReject = (id) => {
    const {
      subject_id,
    } = id
    const {
      rejectSubject,
    } = this.props
    rejectSubject({ subject_id })
    this.openNotificationRejectSuccess('success')
  }

  handleApproveSubjects = (status) => {
    const {
      selectedRowKeys,
    } = this.state

    const {
      approveSubjects,
      rejectSubjects,
    } = this.props

    const data = { approve_ids: selectedRowKeys }

    if (status === 'A') {
      approveSubjects({ data })
      this.openNotificationApproveSuccess('success')
    }
    if (status === 'R') {
      rejectSubjects({ data })
      this.openNotificationRejectSuccess('success')
    }
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
      subjectsState: null,
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

  sortItem = (sort_by) => {
    const { subjects } = this.props
    let dataSort = []
    if (sort_by === 'subject_code') {
      dataSort = subjects.sort((a, b) => (a.get(sort_by).toUpperCase() - b.get(sort_by).toUpperCase()))
    }
    if (sort_by === 'subject_name') {
      dataSort = subjects.sort((c, b) => c.get(sort_by).localeCompare(b.get(sort_by)))
    }
    this.setState({
      subjectsState: dataSort,
    })
  }


  render() {
    const {
      subjects,
    } = this.props

    const {
      filter,
      subjectsState,
    } = this.state
    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    let subjectWait = {}
    let subjectsStateWait = {}
    if (subjects) {
      subjectWait = subjects.toJS().filter(s => s.approved_status === 'PENDING')
    }
    if (subjectsState) {
      subjectsStateWait = subjectsState.toJS().filter(s => s.approved_status === 'PENDING')
    }

    return (
      <PageWrapper>
        <HeaderAdmin />
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
                    subjects === null && (
                      <LoadingPulse />
                    )
                  }
                {
                    subjectWait !== null && subjectWait.length > 0 && (
                    <ListCol>
                      <ListCol>
                        <ListSubject
                          sortItem={this.sortItem}
                          start={this.start}
                          hasSelected={hasSelected}
                          loading={loading}
                          selectedRowKeys={selectedRowKeys}
                          rowSelection={rowSelection}
                          subjects={subjectsState === null ? subjectWait : subjectsStateWait}
                          handleApprove={this.handleApprove}
                          handleReject={this.handleReject}
                          handleApproveSubjects={this.handleApproveSubjects}
                          filter={filter}
                        />
                      </ListCol>
                    </ListCol>
                    )
                  }

                {
                    subjectWait !== null && subjectWait.length === 0 && (
                      <RowContainerNotFound>
                        <NotFoundWrapper>
                          <h1>
                            THERE&apos;S NO SUBJECT WAIT FOR APPROVE.
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
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubjects: subjectAction.getSubjects,
  approveSubject: subjectAction.approveSubject,
  rejectSubject: subjectAction.rejectSubject,
  approveSubjects: subjectAction.approveSubjects,
  rejectSubjects: subjectAction.rejectSubjects,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(AdminApprove)

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
