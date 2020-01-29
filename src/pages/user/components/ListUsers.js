import React from 'react'
import styled from 'styled-components'
import { Segment, Button } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

const getSortedUser = (listUsers, name, sort_order) => {
  if (name === 'name') {
    if (sort_order) {
      return listUsers.sort((a, b) => ((a.getIn(['profile', 'first_name'], '-') > b.getIn(['profile', 'first_name'], '-')) ? 1 : ((b.getIn(['profile', 'first_name'], '-')) > a.getIn(['profile', 'first_name'], '-')) ? -1 : 0))
    }
    return listUsers.sort((a, b) => ((b.getIn(['profile', 'first_name'], '-') > a.getIn(['profile', 'first_name'], '-')) ? 1 : ((a.getIn(['profile', 'first_name'], '-')) > b.getIn(['profile', 'first_name'], '-')) ? -1 : 0))
  }
  if (sort_order) {
    return listUsers.sort((a, b) => ((a.get(name) > b.get(name)) ? 1 : ((b.get(name) > a.get(name)) ? -1 : 0)))
  }
  return listUsers.sort((a, b) => ((b.get(name) > a.get(name)) ? 1 : ((a.get(name) > b.get(name)) ? -1 : 0)))
}

const UserList = (props) => {
  const {
    users,
    filter,
    onClickStandIn,
    sort_by,
    sort_order,
  } = props
  const types = filter.user_types.reduce((acc, curr) => [...acc, ...curr], [])

  const keyword_lower = filter.keyword.toLowerCase()

  let listUsers = users.filter(user => (types.length === 0 || types.indexOf(user.get('role')) > -1)
    && (!keyword_lower || user.get('_id')
      .toLowerCase()
      .indexOf(keyword_lower) > -1
      || user.getIn(['profile', 'first_name'], '-')
        .toLowerCase()
        .indexOf(keyword_lower) > -1
      || user.getIn(['profile', 'last_name'], '-')
        .toLowerCase()
        .indexOf(keyword_lower) > -1
      || user.get('email')
        .toLowerCase()
        .indexOf(keyword_lower) > -1))

  listUsers = getSortedUser(listUsers, sort_by, sort_order)

  // TODO: Status User and Stand-In
  return (
    <Column>
      <Wrapper>
        <Column>

          {listUsers.map(arr => (
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListUserName>
                    <ItemSpan>{arr.get('email')}</ItemSpan>
                  </ListUserName>
                  <ListUserName>
                    <ItemSpan>
                      {arr.getIn(['profile', 'first_name'], '-')}
                      &nbsp;
                      {arr.getIn(['profile', 'last_name'], '-')}
                    </ItemSpan>
                  </ListUserName>
                </UserDetailGroup>
                <UserStatusGroup>
                  <ListUserStatus>
                    <ItemSpan>
                      {/*{*/}
                      {/*  arr.get('status') === 'A' && (*/}
                      {/*    <ItemSpan style={{ color: '#00A699' }}>*/}
                      {/*      Active*/}
                      {/*    </ItemSpan>*/}
                      {/*  )*/}
                      {/*}*/}
                      {
                        arr.get('status') === 'C' && (
                          <ItemSpan style={{ color: '#00A699' }}>
                            <FormattedMessage
                              id='Active'
                              defaultMessage='Active'
                            />
                          </ItemSpan>
                        )
                      }
                      {
                        arr.get('status') === 'N' && (
                          <ItemSpan style={{ color: '#D90000' }}>
                            <FormattedMessage
                              id='Unconfirm'
                              defaultMessage='Unconfirm'
                            />
                          </ItemSpan>
                        )
                      }
                    </ItemSpan>
                  </ListUserStatus>
                  {
                    arr.get('role') !== 'A' && (
                      <ListStandIn
                        onClick={() => onClickStandIn({ email: arr.get('email') })}
                      >
                        <Button basic>
                          <FormattedMessage
                            id='stand-in'
                            defaultMessage='STAND-IN'
                          />
                        </Button>
                      </ListStandIn>
                    )
                  }
                  {
                    arr.get('role') === 'A' && (
                      <ListStandInBlank />
                    )
                  }
                </UserStatusGroup>
              </Row>
            </ItemWrapper>
          ))}
        </Column>
      </Wrapper>
    </Column>
  )
}

export default UserList

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

const ItemWrapper = styled(Segment)`
  background-color: white;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0px !important;
  padding: 0 !important;
  // cursor: pointer;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 73px;
  width: 100%;
`

// language=SCSS prefix=&{ suffix=}
const ItemSpan = styled.span`
    font-size: 16px;
    font-family: Sarabun;
    font-weight: 600;
    word-break: break-word;

    .b {
      font-weight: bold;
    }
`

// language=SCSS prefix=&{ suffix=}
const OtherWrapper = styled.div`
    width: 150px;
    display: flex;
    line-height: 40px;
    padding-left: 8px;
`

const ListUserName = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 40px;
  text-align: left;
  min-width: 250px;
`

const ListBooked = styled(OtherWrapper)`
  min-width: 125px;
`

const ListUserStatus = styled(OtherWrapper)`
  line-height: 40px;
  width: 165px;
  padding-left: 8px;
`

const ListStandIn = styled(OtherWrapper)`
  width: 150px;
  min-width: 125px;
  .ui.basic.button {
    font-family: Sarabun;
    min-width: 95px;
    font-size: 16px;
    color: #929598;
    padding-left: 0.5px;
    padding-right: 0.5px;
  }
`

const UserDetailGroup = styled.div`
  width: 70%;
  display: flex;
`

const UserStatusGroup = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
`
const ListStandInBlank = styled(OtherWrapper)`
  //width: 257px;
  min-width: 125px;
  .ui.basic.button {
    font-family: Sarabun;
    min-width: 95px;
    font-size: 16px;
    color: #929598;
    padding-left: 0.5px;
    padding-right: 0.5px;
  }
`
