import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  Modal, Button, Table,
} from 'antd'

import FilterAndCriteria from './components/FilterAndCriteria'
import TeachHistoryList from './components/TeachHistoryList'

import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'

import withLayout from '~/hocs/Layouts/withLayout'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'


const TableHeader = ({ teachingHistory }) => (
  <Wrapper>
    <Row>
      <ItemHeader>
      SUBJECT :
        {' '}
        {teachingHistory.getIn([0, 'subject_code'])}
        {' '}
        {teachingHistory.getIn([0, 'subject_name'])}
      </ItemHeader>
    </Row>
    <br />
    <Row>
      <UserDetailGroup>
        <ListHeader style={{ minWidth: '86px', flex: 0 }}>
          <ItemHeader>
            NO
          </ItemHeader>
        </ListHeader>
        <ListHeader>
          <ItemHeader>
            DATE
          </ItemHeader>
        </ListHeader>
        <ListHeader style={{ minWidth: '180px' }}>
          <ItemHeader>
            TIME
          </ItemHeader>
        </ListHeader>
        <ListHeader />
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

class TeachingHistory extends Component {
  state = {
    filter: {
      keyword: '',
      subjectsData: '',
      sections: '',
    },
    loading: false,
    open: false,
    reset: true,
    classID: '',
  }

  componentDidMount() {
    const { getCurrentYear, getSections } = this.props
    getCurrentYear({})
    getSections({})
  }

  handleInputChange = async (e, { value }) => {
    await this.setState(state => ({
      ...state,
      filter: {
        ...state.filter,
        subjectsData: value,
      },
    }))
  }

  handleClose = () => {
    this.setState({ open: false })
  };

  handleInputChangeSection = async (e, { value }) => {
    const { filter } = this.state
    await this.setState({
      filter: {
        ...filter,
        sections: value,
      },
    })
  }

  handleResetFilter = () => {
    this.setState({
      reset: true,
      subjectsState: null,
      filter: {
        subjectsData: '',
        sections: '',
      },
    })
  }

  handleFilterHistory = (id) => {
    const { getTeachHistory } = this.props
    getTeachHistory({
      id,
    })
    this.setState({
      reset: false,
    })
  }

  handleModal = (id) => {
    const { getStudentsCheckInClass } = this.props
    getStudentsCheckInClass({
      id,
    })
    this.setState({
      open: true,
      classID: id,
    })
  }

  render() {
    const {
      subjects,
      teachingHistory,
      studentsCheckInClass,
    } = this.props

    const {
      filter,
      filter: { subjectsData, sections },
      reset,
      open,
      classID,
    } = this.state
    // console.log(subjectsData)
    if (subjects === null) {
      return <LoadingPulse />
    }

    const data = []
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'TIME',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'STATUS',
        key: 'status',
        render: (text, record) => (
          <span>
            {record.status === 'ABSENT' && (
              <a style={{ color: '#FF0000' }}>{record.status}</a>
            )}
            {record.status === 'LATE' && (
              <a style={{ color: '#0029FF' }}>{record.status}</a>
            )}
            {record.status === 'ONTIME' && (
              <a>{record.status}</a>
            )}
          </span>
        ),
      },
    ]

    if (studentsCheckInClass) {
      studentsCheckInClass.get('students').sort((a, b) => (a.get('id') > b.get('id'))).map((s, i) => {
        data.push({
          key: i,
          id: s.get('id'),
          name: `${s.get('firstname')} ${s.get('lastname')}`,
          time: s.get('time'),
          status: s.get('status'),
        })
      })
    }

    return (
      <PageWrapper>
        {studentsCheckInClass && (
          <Modal
            width={900}
            visible={open}
            title={(
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ItemHeaderModal>
                  {' '}
                  SUBJECT :{' '}
                  {teachingHistory.getIn([0, 'subject_code'])}
                  {' '}
                  {teachingHistory.getIn([0, 'subject_name'])}
                </ItemHeaderModal>
                <ItemHeaderModal>
                  DATE : {' '}
                  {teachingHistory.getIn([0, 'class']).filter(c => c.get('class_id') === classID).getIn([0, 'date'])}
                </ItemHeaderModal>
                <ItemHeaderModal>
                  TIME :{' '}
                  <a>{teachingHistory.getIn([0, 'class']).filter(c => c.get('class_id') === classID).getIn([0, 'time'])}</a>
                </ItemHeaderModal>
                <ItemHeaderModal>
                  NUMBER OF STUDENTS :{' '}
                  {studentsCheckInClass.get('amount')}
                </ItemHeaderModal>
              </div>
                  )}
            onCancel={this.handleClose}
            footer={[
              <Button key='back' onClick={this.handleClose}>
              Close
              </Button>,
            ]}
          >
            <div>
              <Table columns={columns} pagination={{ position: 'none' }} dataSource={data} />
            </div>
          </Modal>
        )}

        <HeaderProfessor />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria
              filter={filter}
              handleInputChange={this.handleInputChange}
              handleInputChangeSection={this.handleInputChangeSection}
              handleResetFilter={this.handleResetFilter}
              handleFilterHistory={this.handleFilterHistory}
              subjects={subjects}
              id={subjectsData}
              sectionID={sections}
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
                  (reset || teachingHistory === null) && (
                  <NotFound message='Please select subject and section number for see your teaching history.' />
                  )
                  }
                {
                   !reset && teachingHistory !== null && teachingHistory.getIn([0, 'class']).size > 0 && (
                   <ListCol>
                     <TableHeader
                       teachingHistory={teachingHistory}
                     />
                     <ListCol>
                       <TeachHistoryList
                         history={teachingHistory.getIn([0, 'class'])}
                         filter={filter}
                         handleModal={this.handleModal}
                         students={studentsCheckInClass}
                       />
                     </ListCol>
                   </ListCol>
                   )
                  }

                {
                   !reset && teachingHistory !== null && teachingHistory.getIn([0, 'class']).size === 0 && (
                   <NotFound message={'There\'s no teaching history in this subject.'} />
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
  studentsCheckInClass: subjectsSelector.getStudentsCheckInClass,
  teachingHistory: subjectsSelector.getTeachingHistory,
  subjects: subjectsSelector.getSubjectsExport,
  currentYear: yearSelector.getCurrentYear,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getStudentsCheckInClass: subjectAction.getStudentInClassHistory,
  getTeachHistory: subjectAction.getTeachHistory,
  getSections: subjectAction.getSubjectsExport,
  getCurrentYear: yearAction.getCurrentYear,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(TeachingHistory)

const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
  .ant-modal-confirm-body .ant-modal-confirm-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    font-family: kanit;
  }
 
  /* .ant-table-thead>tr:first-child>th:first-child {
    width: 16px;
} */

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
const ItemHeaderModal = styled.span`
  font-family: kanit;
  font-size: 14px;
  margin: 0;
  color: #3d3d3d;
  font-weight: lighter;
`
