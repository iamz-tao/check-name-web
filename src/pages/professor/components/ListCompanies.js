import React, { useState } from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import { Modal } from 'antd'
import { FormattedMessage } from 'react-intl'

import NotFound from '~/components/Table/NotFound'

import UpdateCompany from '../update-company'


const getSortedCompany = (listCompanies, name, sort_order) => {
  if (sort_order) {
    return listCompanies.sort((a, b) => ((a.get(name) > b.get(name)) ? 1 : ((b.get(name) > a.get(name)) ? -1 : 0)))
  }
  return listCompanies.sort((a, b) => ((b.get(name) > a.get(name)) ? 1 : ((a.get(name) > b.get(name)) ? -1 : 0)))
}

const ListCompanies = (props) => {
  const [showModal, setModal] = useState(false)
  const [idCompany, setIDCompany] = useState('')
  // let listCompanies = []
  const {
    companies,
    filter,
    sort_by,
    sort_order,
  } = props

  let listCompanies = companies.filter(c => (
    !(filter.keyword.toLowerCase()) || c.get('_id').toLowerCase()
      .indexOf(filter.keyword.toLowerCase()) > -1 || c.get('name').toLowerCase()
      .indexOf(filter.keyword.toLowerCase()) > -1
  ))

  listCompanies = getSortedCompany(listCompanies, sort_by, sort_order)

  return (
    <Column>
      <Modal
        closable={false}
        title={(
          <FormattedMessage
            id='update-company'
            defaultMessage='Update Company'
          />
        )}
        visible={showModal}
        footer={null}
        destroyOnClose
        width={800}
      >
        <UpdateCompany
          company={!idCompany || listCompanies.filter(c => c.get('_id') === idCompany)}
          setModal={setModal}
        />
      </Modal>
      {
        listCompanies && listCompanies.size > 0 && listCompanies.map(arr => (
          <Wrapper
            onClick={() => {
              setModal(true)
              setIDCompany(arr.get('_id'))
            }}
            style={{
              marginBottom: '1rem',
            }}
          >
            <ListItem>
              <Row>
                <CompanyDetailGroup>
                  <ListCompanyName>
                    <ItemSpan>
                      {
                        arr.get('name')
                      }
                    </ItemSpan>
                  </ListCompanyName>
                </CompanyDetailGroup>
                <CompanyStatusGroup>
                  <ListStandIn>
                    {arr.get('status') === 'A' && (
                      <ItemSpan
                        style={{
                          color: '#00A699',
                        }}
                      >
                        <FormattedMessage
                          id='Active'
                          defaultMessage='Active'
                        />
                      </ItemSpan>
                    )}
                    {arr.get('status') === 'C' && (
                      <ItemSpan
                        style={{
                          color: '#D90000',
                        }}
                      >
                        <FormattedMessage
                          id='Disabled'
                          defaultMessage='Disabled'
                        />
                      </ItemSpan>
                    )}
                    {arr.get('status') === 'N' && (
                      <ItemSpan
                        style={{
                          color: '#F37021',
                        }}
                      >
                        <FormattedMessage
                          id='Disabled'
                          defaultMessage='Disabled'
                        />
                      </ItemSpan>
                    )}
                  </ListStandIn>
                </CompanyStatusGroup>
              </Row>
            </ListItem>
          </Wrapper>
        ))
      }
      {
        listCompanies && listCompanies.size === 0 && (
          <NotFound
            message={(
              <FormattedMessage
                id='no-results-found'
                defaultMessage='No Results Found'
              />
)}
          />
        )
      }
    </Column>
  )
}


export default ListCompanies

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
  width: 100%;
`

const ListItem = styled(Segment)`
  min-height: 73px;
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
  cursor: pointer;
  background-color: white;
  img {
    border-radius: 4px
  }
  .ui.grid>.row{
    padding: 8px 0;
  }
  .ui.grid>.column:not(.row), .ui.grid>.row>.column{
    padding: 0 8px;
  }
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
    //font-size: 1em;
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 40px;
`
const ListCompanyName = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 40px;
  text-align: left;
`

const ListFeeRate = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  text-align: right;
  font-size: 16px;
`

const ListStandIn = styled(OtherWrapper)`
  flex: 1;
  width: 100%;
  display: grid;
  .ui.basic.button{
    font-family: Sarabun;
    min-width: 95px;
    font-size: 16px;
    color: #929598;
  }
`
const CompanyDetailGroup = styled.div`
  width: 65%;
  display: flex;
`
const CompanyStatusGroup = styled.div`
  width: 35%;
  display: flex;
  justify-content: right;
`
