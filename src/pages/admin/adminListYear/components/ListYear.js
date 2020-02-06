import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import {
  Switch,
} from 'antd'

const UserList = (props) => {
  const {
    list_year,
    filter,
    handleChangeStatus,
    handleGetId,
  } = props


  // const keyword_lower = filter.keyword.toLowerCase()

  return (
    <Column>
      <Wrapper>
        <Column>
          {list_year.map(y => (
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListUserName>
                    <ItemSpan>
                      {y.get('year')}
                    </ItemSpan>
                  </ListUserName>
                  <ListUserName>
                    <ItemSpan>
                      {y.get('semester')}
                    </ItemSpan>
                  </ListUserName>
                </UserDetailGroup>
                <UserStatusGroup>
                  <ListUserStatus>
                    <ItemSpan>
                      {
                        y.get('status') === 'DISABLE' && (
                          <ItemSpan style={{ color: '#D94646' }}>
                            DISABLE
                          </ItemSpan>
                        )
                      }
                      {
                        y.get('status') === 'ACTIVE' && (
                          <ItemSpan style={{ color: '#001AFF' }}>
                            ACTIVE
                          </ItemSpan>
                        )
                      }
                    </ItemSpan>
                  </ListUserStatus>

                </UserStatusGroup>
                <Switch defaultChecked onChange={handleChangeStatus} onClick={() => handleGetId(y.get('id'))} />
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

const ListUserStatus = styled(OtherWrapper)`
  line-height: 40px;
  width: 116px;
  padding-left: 8px;
`
const UserDetailGroup = styled.div`
  width: 66%;
  display: flex;
`

const UserStatusGroup = styled.div`
  width: 16%;
  display: flex;
  justify-content: flex-end;
`
