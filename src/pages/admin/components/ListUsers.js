import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import { Button } from 'antd'
import FormButton from '~/components/Form/Button'
import DeleteIcon from '~/components/DeleteIcon'

const UserList = (props) => {
  const {
    users,
    filter,
    handleDeleteUser,
  } = props

  const types = filter.user_role.reduce((acc, curr) => [...acc, ...curr], [])

  const keyword_lower = filter.keyword.toLowerCase()

  return (
    <Column>
      <Wrapper>
        <Column>
          {users.map(user => (
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListDetail style={{ paddingLeft: '40px' }}>
                    <ItemSpan>
                      {user.get('id')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail style={{ flex: 2 }}>
                    <ItemSpan>
                      {user.get('firstname')}
                    &nbsp;
                      {user.get('lastname')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail style={{ flex: 2 }}>
                    <ItemSpan>
                      {user.get('email')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail style={{ justifyContent: 'center' }}>
                    <ItemSpan>
                      {
                        user.get('role') === 'ADMIN' && (
                          <ItemSpan style={{ color: '#001AFF' }}>
                            ADMIN
                          </ItemSpan>
                        )
                      }
                      {
                        user.get('role') === 'PROFESSOR' && (
                          <ItemSpan style={{ color: '#F08282' }}>
                            LECTURER
                          </ItemSpan>
                        )
                      }
                      {
                        user.get('role') === 'NISIT' && (
                          <ItemSpan style={{ color: '#1AB433' }}>
                            STUDENT
                          </ItemSpan>
                        )
                      }
                    </ItemSpan>
                  </ListDetail>
                  <CustomDelete>
                    <DeleteIcon
                      className='trash'
                      onClick={(e) => {
                        e.preventDefault()
                        handleDeleteUser(user.get('uid'))
                      }
                      }
                    />
                  </CustomDelete>
                </UserDetailGroup>

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
  .ant-btn {
    width: 100px;
    height: 38px;
    margin-right: 23px;
    border-radius: 24px;
    background-color: #CA5353 !important;
    border: 0.8px solid #CA5353;
    box-sizing: border-box;
    color: #ffff !important;
    :hover {
      background-color: #ffff !important;
      color: #CA5353 !important;
    }
  }
`

const ItemWrapper = styled(Segment)`
  background-color: white;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0px !important;
  padding: 0 !important;
  cursor: pointer;
  background: #FFFFFF !important;
  border: 1px solid #D0CDCD !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 18px !important;
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
  height: 76px;
  width: 100%;
`

const ItemSpan = styled.span`
    font-size: 14px;
    font-family: Sarabun;
    font-weight: 600;
    word-break: break-word;

    .b {
      font-weight: bold;
    }
`

const OtherWrapper = styled.div`
    display: flex;
    line-height: 40px;
`

const ListDetail = styled(OtherWrapper)`
  flex: 1;
  display: flex;
  text-align: start;
`

const CustomDelete = styled(OtherWrapper)`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 8px;
`
const UserDetailGroup = styled.div`
  display: flex;
  flex: 5;
`
