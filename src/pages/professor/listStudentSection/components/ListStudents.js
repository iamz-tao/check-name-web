import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import { Button } from 'antd'
import NotFound from '~/components/Table/NotFound'

const StudentList = (props) => {
  const {
    students,
    filter,
    handleRemove,
  } = props

  const items = students.filter((s) => {
    if (filter.keyword === '') return s
    if (s.getIn(['std_id']).toLowerCase().includes(filter.keyword.toLowerCase())
    || s.getIn(['firstname']).toLowerCase().includes(filter.keyword.toLowerCase())
    || s.getIn(['lastname']).toLowerCase().includes(filter.keyword.toLowerCase())) {
      return s
    }
  }).map(s => (
    <Column>
      <Wrapper>
        <Column>
          {/* {students.map(s => ( */}
          <ItemWrapper>
            <Row>
              <UserDetailGroup>
                <ListDetail>
                  <ItemSpan>
                    {s.get('std_id')}
                  </ItemSpan>
                </ListDetail>
                <ListDetail style={{ flex: '2' }}>
                  <ItemSpan>
                    {s.get('firstname')}
                    {' '}
                    {s.get('lastname')}
                  </ItemSpan>
                </ListDetail>
                <ListDetail>
                  <ItemSpan>
                    {
                        s.get('status') === 'DROP' && (
                          <ItemSpan style={{ color: '#D94646' }}>
                            DROP
                          </ItemSpan>
                        )
                     }
                    {
                        s.get('status') === 'APPROVE' && (
                          <ItemSpan style={{ color: '#001AFF' }}>
                            ACTIVE
                          </ItemSpan>
                        )
                      }
                  </ItemSpan>
                </ListDetail>
                <ListDetail style={{ paddingLeft: 0 }}>
                  <ItemSpan>
                    {
                        s.get('status') === 'DROP' && (
                          <Button disabled={s.get('status') === 'APPROVE'} style={{ backgroundColor: '#1AB433', border: '0.8px solid rgb(217, 70, 70)' }} onClick={() => handleRemove(s.get('request_id'))}>REMOVE</Button>
                        )}
                  </ItemSpan>
                </ListDetail>
              </UserDetailGroup>
            </Row>
          </ItemWrapper>
          {/* ))} */}
        </Column>
      </Wrapper>
    </Column>
  ))

  if (items.length === 0) {
    return <NotFound message={'There\'s no student in section.'} />
  }
  return (
    items
  )
}

export default StudentList

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 100px;
    height: 38px;
    font-family: kanit;
    font-size: 13px;
    margin-right: 23px;
    border-radius: 24px;
    background-color: rgb(217, 70, 70) !important;
    border: 1px solid #a2a2a2;
    box-sizing: border-box;
    color: #FFFFFF !important;
    :hover {
      background-color: #ffff !important;
      color: #CA5353 !important;
    }
    :disabled {
      cursor: not-allowed;
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
  margin-bottom: 4px;
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

const ListDetail = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 40px;
  text-align: left;
`

const UserDetailGroup = styled.div`
  display: flex;
  flex: 3;
  height: 100%;
  align-items: center;
`
