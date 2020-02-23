import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Modal, notification } from 'antd'
import { Icon } from 'semantic-ui-react'
import Router from 'next/router'

import get from 'lodash/get'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

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

// export const SortItem = () => {

// }

const TableHeader = ({ sortItem }) => (
  <Wrapper>
    <ButtonWrapper>
      <FormButton
        colorButton='#006765'
        type='submit'
        txtButton='NEW'
        width='50%'
        onClick={() => {
          Router.push('/adminRegister')
        }}
      />
    </ButtonWrapper>

    <Row>
      <UserDetailGroup>
        <ListHeader style={{ paddingLeft: '40px' }}>
          <ItemHeader>
            ID
          </ItemHeader>
          <Icon
            name='sort'
            style={{ paddingTop: '2px', cursor: 'pointer' }}
            onClick={() => sortItem('id')}
          />
        </ListHeader>
        <ListHeader style={{ flex: 2 }}>
          <ItemHeader>
            NAME
          </ItemHeader>
          <Icon
            name='sort'
            style={{ paddingTop: '2px', cursor: 'pointer' }}
            onClick={() => sortItem('firstname')}
          />
        </ListHeader>
        <ListHeader style={{ flex: 2 }}>
          <ItemHeader>
            EMAIL
          </ItemHeader>
          <Icon
            name='sort'
            style={{ paddingTop: '2px', cursor: 'pointer' }}
            onClick={() => sortItem('email')}
          />
        </ListHeader>
        <ListHeader style={{ justifyContent: 'center' }}>
          <ItemHeader>
            STATUS
          </ItemHeader>
        </ListHeader>
        <ListHeader />
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

class HomePageAdmin extends Component {
  state = {
    usersState: null,
    filter: {
      user_role: [],
      keyword: '',
    },
  }

  componentDidMount() {
    const authToken = Cookie.get('token')
    if (!authToken) {
      Router.push('/login')
    }
    const { getUsers, users } = this.props
    getUsers({})
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
        user_role: [],
        keyword: '',
      },
      usersState: null,
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

  sortItem = (sort_by) => {
    const { users } = this.props
    let dataSort = []
    if (sort_by === 'id') {
      dataSort = users.sort((a, b) => (a.get(sort_by).toUpperCase() - b.get(sort_by).toUpperCase()))
    }
    if (sort_by === 'email' || sort_by === 'firstname') {
      dataSort = users.sort((c, b) => c.get(sort_by).localeCompare(b.get(sort_by)))
    }
    this.setState({
      usersState: dataSort,
    })
  }

  render() {
    const {
      users,
    } = this.props

    const {
      filter,
      usersState,
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
                        <TableHeader
                          sortItem={this.sortItem}
                        />
                        <ListCol>
                          <ListUsers
                            users={usersState === null ? users : usersState}
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
    text-align: start;
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
  padding: 0px 0px 16px 0px;
`

const ListHeader = styled(OtherWrapper)`
  flex: 1;
  display: flex;
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
  flex: 5;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
