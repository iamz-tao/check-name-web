import React, { Fragment } from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { createStructuredSelector } from 'reselect'
import ListUsers from './components/ListUsers'
import FilterAndCriteria from './components/FilterAndCriteria'

import { userAction } from '~/modules/admin/actions'
import { userSelector } from '~/modules/admin/selectors'
import withIntl from '~/helpers/withIntl'
import withLayout from '~/hocs/Layouts/withLayout'
import NavigationVendor from '~/components/NavigationBar/Vendor'
import LoadingPulse from '~/components/LoadingPulse'
import NotFound from '~/components/Table/NotFound'
import { Sorting } from '~/pages/company'
import { user_types } from '~/config/constants'
import { valueParser } from '~/helpers/normalize'

// TODO fix word in span
const TableHeader = ({ sort_order, sort_by, handleSort }) => (
  <Wrapper>
    <Row>
      <UserDetailGroup>
        <ListUserEmail>
          <ItemHeader
            onClick={() => handleSort(!sort_order, 'email')}
          >
            <FormattedMessage
              id='email'
              defaultMessage='EMAIL'
            />
            <Sorting
              sort_order={sort_order}
              sort_by={sort_by}
              name='email'
            />
          </ItemHeader>
        </ListUserEmail>
        <ListUserName>
          <ItemHeader
            onClick={() => handleSort(!sort_order, 'name')}
          >
            <FormattedMessage
              id='NAME'
              defaultMessage='NAME'
            />
            <Sorting
              sort_order={sort_order}
              sort_by={sort_by}
              name='name'
            />
          </ItemHeader>
        </ListUserName>
      </UserDetailGroup>
      <UserStatusGroup>
        <ListUserStatus>
          <ItemHeader
            onClick={() => handleSort(!sort_order, 'status')}
          >
            <FormattedMessage
              id='status'
              defaultMessage='STATUS'
            />
            <Sorting
              sort_order={sort_order}
              sort_by={sort_by}
              name='status'
            />
          </ItemHeader>
        </ListUserStatus>
        <ListStandIn />
      </UserStatusGroup>
    </Row>
    <EmptyGroup width='63px' />
  </Wrapper>
)

class UserListPage extends React.Component {
  state = {
    users: null,
    filter: {
      user_types: [],
      keyword: '',
    },
    sort_by: 'email',
    sort_order: true,
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
        user_types: [],
        keyword: '',
      },
    })
  }

  handleCheckboxUserType = async (e, data) => {
    const { value } = data
    const { filter } = this.state

    // single role
    const newUserType = [value]

    // multiple roles
    //let newUserType = filter.user_types
    //if (checked) {
    //  newUserType.push(value)
    //} else {
    //  newUserType = newUserType.filter(m => m !== value)
    //}

    await this.setState({
      filter: {
        ...filter,
        user_types: newUserType,
      },
    })

    this.fetch()
  }

  handleOnClickStandIn = ({ email }) => {
    const { standIn } = this.props
    standIn({ email })
  }

  handleSort = async (sort_order, sort_by) => {
    await this.setState({
      sort_order,
      sort_by,
    })
  }

  render() {
    const {
      users,
    } = this.props

    const {
      filter,
      sort_by,
      sort_order,
    } = this.state

    const locale_user_type = []
    user_types.map((val, i) => {
      locale_user_type[i] = {
        id: val.label,
        defaultMessage: val.label,
      }
    })

    return (
      <PageWrapper>
        <NavigationVendor
          headerTitle={(
            <FormattedMessage
              id='users-management'
              defaultMessage='Users Management'
            />
          )}
        />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria
              locale_user_type={locale_user_type}
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

              {
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
                          sort_order={sort_order}
                          sort_by={sort_by}
                          handleSort={this.handleSort}
                        />
                        <ListCol>
                          <ListUsers
                            users={users}
                            filter={filter}
                            sort_by={sort_by}
                            sort_order={sort_order}
                            onClickStandIn={this.handleOnClickStandIn}
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
  users: userSelector.getUsers,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: userAction.getUsers,
  standIn: userAction.standIn,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntl,
  withLayout,
)(UserListPage)

const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`
const UserDetailGroup = styled.div`
  width: 70%;
  display: flex;
  color: #929598;
  font-size: 16px;
`
// const UserStatusGroup = styled.div`
//   width: 30%;
//   display: flex;
//   //justify-content: flex-end;
//   padding-right: 220px;
//   color: #929598;
//   font-size: 16px;
// `
const UserStatusGroup = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
`
const EmptyGroup = styled.div`
  height: 100%;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 16px 0px;
`
// language=SCSS prefix=&{ suffix=}
const ItemHeader = styled.span`
    font-size: 1.21em;
    margin: 0;
    color: #929598;
    cursor: pointer;
`
// language=SCSS prefix=&{ suffix=}
const OtherWrapper = styled.div`
    //font-size: 1em;
    display: flex;
    justify-content: center;
    text-align: center;
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
  // min-width: 125px;
  padding-left: 5px;
`

const RowContainer = styled.div`
  display: flex;
  padding: 20px;
  flex: 1;
  justify-content: center;
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

  @media (max-width: 1024px) {
    position: absolute;
    transform: translate(-500%, 0px);
  }
`

const Space = styled.div`
  height: 20px;
`
const ListStandIn = styled(OtherWrapper)`
  width: 257px;
  //min-width: 125px;
  .ui.basic.button {
    font-family: Sarabun;
    min-width: 95px;
    font-size: 16px;
    color: #929598;
    padding-left: 0.5px;
    padding-right: 0.5px;
  }
`
