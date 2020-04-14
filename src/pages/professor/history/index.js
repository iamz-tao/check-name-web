import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Modal, notification, Button, List, Typography, Divider } from 'antd'
import { Icon } from 'semantic-ui-react'

import FilterAndCriteria from './components/FilterAndCriteria'
import TeachHistoryList from './components/TeachHistoryList'

import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'

import withLayout from '~/hocs/Layouts/withLayout'
import { Link } from '~/routes'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const TableHeader = ({ teachingHistory }) => (
  <Wrapper>
    <Row>
      <ItemHeader>
      SUBJECT NAME :
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
    } = this.state
    // console.log(subjectsData)
    if (subjects === null) {
      return <LoadingPulse />
    }
    return (
      <PageWrapper>
        <Modal
          visible={open}
          title="List of Students"
          onCancel={this.handleClose}
          footer={[
            <Button key="back" onClick={this.handleClose}>
              Close
            </Button>,
          ]}
        >
          <div>
          <Divider orientation="left">Small Size</Divider>
    <List
      size="small"
      header={<div style={{display: 'flex', flexDirection: 'row'}}><div>Header</div><div>AAAa</div></div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
          </div>
        </Modal>
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
