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
    this.fetch()
  }

  handleResetFilter = () => {
    this.setState({
      filter: {
        user_role: [],
        keyword: '',
      },
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
      subjects,
    } = this.props

    const {
    //   filter,
    } = this.state
    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    const subjectWait = subjects !== null ? subjects.toJS().filter(s => s.approved_status === 'PENDING') : 0

    return (
      <PageWrapper>
        <HeaderAdmin />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria />
          </FilterWrapper>
          <RowContainer style={{ paddingTop: 0 }}>
            <ListCol
              style={{
                position: 'relative',
              }}
            >

              {
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
                          start={this.start}
                          hasSelected={hasSelected}
                          loading={loading}
                          selectedRowKeys={selectedRowKeys}
                          rowSelection={rowSelection}
                          subjects={subjectWait}
                          handleApprove={this.handleApprove}
                          handleReject={this.handleReject}
                          handleApproveSubjects={this.handleApproveSubjects}
                        />
                      </ListCol>
                    </ListCol>
                    )
                  }

                  {
                    subjectWait !== null && subjects.toJS().filter(s => s.approved_status === 'PENDING').length === 0 && (
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
                // )
              }
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
