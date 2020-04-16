import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Modal, notification } from 'antd'
import isNil from 'lodash/isNil'

import { Icon } from 'semantic-ui-react'
import FilterAndCriteria from './components/FilterAndCriteria'
import YearList from './components/YearList'
import CreateYear from './components/createYear'

import HeaderAdmin from '~/components/HeaderNavbar/Admin'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'
import FormButton from '~/components/Form/Button'

import withLayout from '~/hocs/Layouts/withLayout'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'

const { confirm } = Modal

const TableHeader = (props) => {
  const {
    handleModal,
    sortItem,
  } = props

  return (
    <Wrapper>
      <FormButton
        colorButton='#006765'
        type='submit'
        txtButton='NEW'
        width='50%'
        onClick={() => handleModal()}
      />
      <Row>
        <UserDetailGroup>
          <ListHeader>
            <ItemHeader>
              YEAR
            </ItemHeader>
            <Icon
              name='sort'
              style={{ paddingTop: '2px', cursor: 'pointer' }}
              onClick={() => sortItem('year')}
            />
          </ListHeader>
          <ListHeader>
            <ItemHeader>
              SEMESTER
            </ItemHeader>
            <Icon
              name='sort'
              style={{ paddingTop: '2px', cursor: 'pointer' }}
              onClick={() => sortItem('semester')}
            />
          </ListHeader>
          <ListHeader>
            <ItemHeader>
              STATUS
            </ItemHeader>
          </ListHeader>
          <ListHeader />
        </UserDetailGroup>
        <DeleteWrapper />
      </Row>
    </Wrapper>
  )
}

class HomePageAdmin extends Component {
  state = {
    list_year_state: null,
    year: '',
    semester: '',
    open: false,
    loading: false,
    filter: {
      keyword: '',
    },
  }

  componentDidMount() {
    const token = Cookie.get('token')
    if (isNil(token)) {
      window.location.href = '/login'
    }
    const { getYearAll } = this.props
    getYearAll({})
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

  handleInput = (type, e) => {
    const { change } = this.props
    change(type, e)
  }

  handleResetFilter = () => {
    this.setState({
      filter: {
        keyword: '',
      },
      list_year_state: null,
    })
  }

  handleGetId = (id) => {
    const { updateCurrentYear } = this.props
    updateCurrentYear({ id })
  }

  handleModal = () => {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  handleDeleteYear = (id) => {
    const { deleteYear } = this.props
    const success = 'success'
    confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure delete this year? You can\'t undo this action.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteYear({ id })
        notification[success]({
          message: 'Delete Success!',
          description:
            'Action completed successfully.',
        })
      },
      onCancel() {
      },
    })
  }

  sortItem = (sort_by) => {
    const { list_year } = this.props
    let dataSort = []
    if (sort_by === 'year') {
      dataSort = list_year.sort((a, b) => (a.get(sort_by).toUpperCase() - b.get(sort_by).toUpperCase()))
    }
    if (sort_by === 'semester') {
      dataSort = list_year.sort((c, b) => c.get(sort_by).localeCompare(b.get(sort_by)))
    }
    this.setState({
      list_year_state: dataSort,
    })
  }

  render() {
    const {
      list_year,
    } = this.props

    const {
      filter,
      open,
      list_year_state,
    } = this.state

    // console.log(list_year_state)
    // console.log('xxxxxl',list_year)
    return (
      <PageWrapper>
        <CreateYear
          open={open}
          handleModal={this.handleModal}
          handleInputChange={this.handleInputChange}
          handleInput={this.handleInput}
        />
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
                    list_year === null && (
                      <LoadingPulse />
                    )
                  }
                {
                    list_year !== null && list_year.size > 0 && (
                      <ListCol>
                        <TableHeader
                          handleModal={this.handleModal}
                          sortItem={this.sortItem}
                        />
                        <ListCol>
                          <YearList
                            list_year={list_year_state === null ? list_year : list_year_state}
                            filter={filter}
                            handleGetId={this.handleGetId}
                            handleDeleteYear={this.handleDeleteYear}
                          />
                        </ListCol>
                      </ListCol>
                    )
                  }

                {
                    list_year !== null && list_year.size === 0 && (
                      <NotFound message={`There's no year list.`} />
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
  list_year: yearSelector.getAllYear,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getYearAll: yearAction.getYearAll,
  deleteYear: yearAction.deleteYear,
  updateCurrentYear: yearAction.updateCurrentYear,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(HomePageAdmin)

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
const UserDetailGroup = styled.div`
  display: flex;
  flex: 4;
  color: #929598;
  font-size: 16px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  width: 100%;
`
const DeleteWrapper = styled.div`
  display: flex;
  width: 128px;
`
