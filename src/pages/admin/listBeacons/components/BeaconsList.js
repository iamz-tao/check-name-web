import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import DeleteIcon from '~/components/DeleteIcon'
import NotFound from '~/components/Table/NotFound'

const BeaconList = (props) => {
  const {
    beaconList,
    filter,
    handleDeleteBeacon,
  } = props

  const items = beaconList.filter((beacon) => {
    if (filter.keyword === '') return beacon
    if (beacon.get('uuid').toLowerCase().includes(filter.keyword.toLowerCase())
    || beacon.get('name').toLowerCase().includes(filter.keyword.toLowerCase())
    ) {
      return beacon
    }
  }).map(beacon => (
    <Column>
      <Wrapper>
        <Column>
          {/* {beaconList.map(y => ( */}
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListDetail style={{ flex: 2 }}>
                    <ItemSpan>
                      {beacon.get('uuid')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail>
                    <ItemSpan>
                      {beacon.get('name')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail>
                    <ItemSpan>
                      {
                        beacon.get('status') === 'DISABLE' && (
                          <ItemSpan style={{ color: '#D94646' }}>
                            DISABLE
                          </ItemSpan>
                        )
                      }
                      {
                        beacon.get('status') === 'ACTIVE' && (
                          <ItemSpan style={{ color: '#001AFF' }}>
                            ACTIVE
                          </ItemSpan>
                        )
                      }
                    </ItemSpan>
                  </ListDetail>
                </UserDetailGroup>
                <DeleteWrapper>
                  <DeleteIcon
                    className='trash'
                    onClick={(e) => {
                      e.preventDefault()
                      handleDeleteBeacon(beacon.get('id'))
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
    return <NotFound />
  }
  return (
    items
  )
}

export default BeaconList

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
