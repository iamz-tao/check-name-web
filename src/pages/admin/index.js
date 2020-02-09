import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Modal, notification } from 'antd'
import Router from 'next/router'

import FilterAndCriteria from './components/FilterAndCriteria'
import ListUsers from './components/ListUsers'
import HeaderAdmin from '~/components/HeaderNavbar/Admin'

import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'
import FormButton from '~/components/Form/Button'

import withLayout from '~/hocs/Layouts/withLayout'
import { userAction } from '~/modules/admin/actions'
import { userSelector } from '~/modules/admin/selectors'

const { confirm } = Modal

const TableHeader = () => (
  <Wrapper>
    <FormButton
      colorButton='#006765'
      type='submit'
      txtButton='NEW'
      width='50%'
      onClick={() => {
        Router.push('/adminRegister')
      }}
    />
    <Row>
      <UserDetailGroup>
        <ListUserEmail>
          <ItemHeader>
            ID
          </ItemHeader>
        </ListUserEmail>
        <ListUserName>
          <ItemHeader>
            NAME
          </ItemHeader>
        </ListUserName>
        <ListUserName>
          <ItemHeader>
            EMAIL
          </ItemHeader>
        </ListUserName>
      </UserDetailGroup>
      <UserStatusGroup>
        <ListUserStatus>
          <ItemHeader>
            STATUS
          </ItemHeader>
        </ListUserStatus>
      </UserStatusGroup>

    </Row>
 </Wrapper>
)

class HomePageAdmin extends Component {
  state = {
    users: null,
    filter: {
      user_role: [],
      keyword: '',
    },
  }

  componentDidMount() {
    const { getUsers } = this.props
    getUsers({})
  }

  fetch = () => {
    const { filter } = this.state
    const { getUsers } = this.props
    getUsers({
      filter: {
        ...filter,
      },
    })
  }

  handleCheckboxUserType = async (e, data) => {
    const { value } = data
    const { filter } = this.state

    const newUserType = [value]

    await this.setState({
      filter: {
        ...filter,
        user_role: newUserType,
      },
    })

    this.fetch()
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

  openNotificationDeleteSuccess = (type) => {
    notification[type]({
      message: 'Delete Success!',
      description:
        'Action completed successfully.',
    })
  }

  showDeleteConfirm = (id) => {
    const { deleteUser } = this.props
    const success = 'success'
    confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure delete this user? You can\'t undo this action.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteUser({ id })
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

  render() {
    const {
      users,
    } = this.props

    const {
      filter,
    } = this.state

    return (
      <PageWrapper>
        <HeaderAdmin />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria
              filter={filter}
              handleCheckboxUserType={this.handleCheckboxUserType}
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
                  {
                    users === null && (
                      <LoadingPulse />
                    )
                  }
                  {
                    users !== null && users.size > 0 && (
                      <ListCol>
                        <TableHeader />
                        <ListCol>
                          <ListUsers
                            users={users}
                            filter={filter}
                            handleDeleteUser={this.showDeleteConfirm}
                          />
                        </ListCol>
                      </ListCol>
                    )
                  }

                  {
                    users !== null && users.size === 0 && (
                      <NotFound />
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
  users: userSelector.getUsers,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: userAction.getUsers,
  deleteUser: userAction.deleteUser,
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

const ListUserEmail = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 35px;
  text-align: left;
  min-width: 250px;
`
const ListUserName = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 40px;
  text-align: left;
  min-width: 250px;
`

const ListUserStatus = styled(OtherWrapper)`
  padding-left: 5px;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32%;
  width: 100%;
`
const UserDetailGroup = styled.div`
  width: 66%;
  display: flex;
  color: #929598;
  font-size: 16px;
`
const UserStatusGroup = styled.div`
  width: 34%;
  display: flex;
  justify-content: center;
  padding-right: 108px;
  font-size: 16px;
`