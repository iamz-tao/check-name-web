import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Modal, notification } from 'antd'
import { Icon } from 'semantic-ui-react'

import FilterAndCriteria from './components/FilterAndCriteria'
import SubjectsList from './components/ListSubjects'
import ListStudentExport from './components/ListStudentExport'

import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'

import withLayout from '~/hocs/Layouts/withLayout'
import { Link } from '~/routes'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'

const { confirm } = Modal

const TableHeader = ({ sortItem }) => (
  <Wrapper>
    <Row>
      <UserDetailGroup>
        <ListHeader>
          <ItemHeader>
            SUBJECT CODE
          </ItemHeader>
          <Icon
            name='sort'
            style={{ paddingTop: '2px', cursor: 'pointer' }}
            onClick={() => sortItem('subject_code')}
          />
        </ListHeader>
        <ListHeader>
          <ItemHeader>
            SUBJECT NAME
          </ItemHeader>
          <Icon
            name='sort'
            style={{ paddingTop: '2px', cursor: 'pointer' }}
            onClick={() => sortItem('subject_name')}
          />
        </ListHeader>
        <ListHeader style={{ minWidth: '180px' }}>
          <ItemHeader>
            SECTION NUMBER
          </ItemHeader>
        </ListHeader>
        <ListHeader />
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

class HomePageProfessor extends Component {
  state = {
    subjectsState: null,
    filter: {
      keyword: '',
    },
    addDay: false,
    open: false,
    openExport: false,
    subject_code: '',
  }

  componentDidMount() {
    const { getSections, getCurrentYear } = this.props
    getSections({
    })
    getCurrentYear({})
  }

  handleDeleteSection = (id) => {
    const { deleteSection } = this.props
    const success = 'success'
    confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure delete this section? You can\'t undo this action.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteSection({ id })
        notification[success]({
          message: 'Delete Succeeded!',
          description:
            'Action completed successfully.',
        })
      },
      onCancel() {
      },
    })
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

  handleModal = (id) => {
    const { open } = this.state
    const { getSection } = this.props
    if (id) {
      getSection({ id })
    }

    this.setState({
      open: !open,
      addDay: false,
    })
  }

  handleExportModal = (id, subject_code) => {
    const { openExport } = this.state
    const { getAttendanceSheet } = this.props
    getAttendanceSheet({  
      id,
    })
    this.setState({
      openExport: !openExport,
      subject_code,
    })
  }

  handleExport = (subject_name, section) => {
    const { currentYear } = this.props
    const { subject_code } = this.state
    const year = currentYear.get('year')
    const semester = currentYear.get('semester')
    const data = {
      year,
      semester,
      subject_code,
      subject_name,
      section,
    }
    const { exportReport } = this.props
    exportReport({
      data,
      isShow: true,
    })
    this.setState({
      openExport: false,
    })
  }

  sortItem = (sort_by) => {
    const { subjects } = this.props
    let dataSort = []
    if (sort_by === 'subject_code') {
      dataSort = subjects.sort((a, b) => (a.getIn(['Subject', sort_by]).toUpperCase() - b.getIn(['Subject', sort_by]).toUpperCase()))
    }
    if (sort_by === 'subject_name') {
      dataSort = subjects.sort((c, b) => c.getIn(['Subject', sort_by]).localeCompare(b.getIn(['Subject', sort_by])))
    }
    this.setState({
      subjectsState: dataSort,
    })
  }


  render() {
    const {
      subjects,
      attendanceSheet,
      currentYear,
    } = this.props

    const {
      filter,
      open,
      subjectsState,
      openExport,
      subject_code,
    } = this.state
    if (!currentYear) {
      return (
        <LoadingPulse />
      )
    }

    return (
      <PageWrapper>
        <ListStudentExport
          open={openExport}
          handleClose={this.handleExportModal}
          handleExport={this.handleExport}
          attendanceSheet={attendanceSheet}
          subject_code={subject_code}
        />
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
                    subjects === null && (
                      <LoadingPulse />
                    )
                  }
                {
                    subjects !== null && subjects.size > 0 && (
                      <ListCol>
                        <TableHeader
                          sortItem={this.sortItem}
                        />
                        <ListCol>
                          <SubjectsList
                            subjects={subjectsState === null ? subjects : subjectsState}
                            filter={filter}
                            handleDeleteSection={this.handleDeleteSection}
                            handleModal={this.handleModal}
                            handleExportModal={this.handleExportModal}
                          />
                        </ListCol>
                      </ListCol>
                    )
                  }

                {
                    subjects !== null && subjects.size === 0 && (
                      <NotFound message={'There isn\'t a section in this semester.'} />
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
  subjects: subjectsSelector.getSubjectsProfessor,
  currentYear: yearSelector.getCurrentYear,
  attendanceSheet: subjectsSelector.getAttendanceSheet,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSections: subjectAction.getSubjectsProfessor,
  getSection: subjectAction.getSection,
  deleteSection: subjectAction.deleteSection,
  getAttendanceSheet: subjectAction.getAttendanceSheet,
  getCurrentYear: yearAction.getCurrentYear,
  exportReport: subjectAction.exportReport,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(HomePageProfessor)

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
  align-items: flex-end;
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
