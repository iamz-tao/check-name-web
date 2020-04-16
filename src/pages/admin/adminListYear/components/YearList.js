import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import {
  Switch,
} from 'antd'
import DeleteIcon from '~/components/DeleteIcon'
import NotFound from '~/components/Table/NotFound'

const YearList = (props) => {
  const {
    list_year,
    filter,
    handleGetId,
    handleDeleteYear,
  } = props
  const items = list_year.filter((y) => {
// console.log('list_year',y.get('year').toString().toLowerCase())
    if (filter.keyword === '' && filter.user_role === []) return y
    if (y.get('year').toString().toLowerCase().includes(filter.keyword.toLowerCase())
    || y.get('semester').toLowerCase().includes(filter.keyword.toLowerCase())
    ) {
      return y
    }
  }).map(y => (
    <Column>
      <Wrapper>
        <Column>
          {/* {list_year.map(y => ( */}
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListDetail>
                    <ItemSpan>
                      {y.get('year')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail>
                    <ItemSpan>
                      {y.get('semester')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail>
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
                  </ListDetail>
                  <ListDetail style={{ textAlign: 'right' }}>
                    <Switch defaultChecked={y.get('status') === 'ACTIVE'} checked={y.get('status') === 'ACTIVE'} onClick={() => handleGetId(y.get('id'))} />
                  </ListDetail>
                </UserDetailGroup>
                <DeleteWrapper>
                  <DeleteIcon
                    className='trash'
                    onClick={(e) => {
                      e.preventDefault()
                      handleDeleteYear(y.get('id'))
                    }}
                  />
                </DeleteWrapper>
              </Row>
            </ItemWrapper>
          {/* ))} */}
        </Column>
      </Wrapper>
    </Column>
  ))

  if (items.length === 0) {
    return <NotFound message={`There's no year list.`} />
  }
  return (
    items
  )
}

export default YearList

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
  .ant-switch-checked {
    background-color: #FFCDCD;
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

const DeleteWrapper = styled.div`
  display: flex;
  width: 128px;
  justify-content: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6px;
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
  flex: 4;
`
