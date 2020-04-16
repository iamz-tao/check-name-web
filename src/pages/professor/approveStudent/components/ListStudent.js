import React from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd'
import { Icon } from 'semantic-ui-react'


const ListStudent = (props) => {
  const {
    students,
    filter,
    // handleDeleteUser,
    hasSelected,
    start,
    loading,
    selectedRowKeys,
    rowSelection,
    handleReject,
    handleApprove,
    handleApproveSubjects,
    sortItem,
  } = props
  // console.log('filter>>', filter)

  const waitApprove = students ? students.filter(s => s.get('status') === 'PENDING') : []

  const columns = [
    {
      title: (
        <div>
          STUDENT ID
          <Icon
            name='sort'
            style={{ cursor: 'pointer' }}
            onClick={() => sortItem('std_id')}
          />
        </div>
      ),
      dataIndex: 'student_id',
    },
    {
      title: (
        <div>
          NAME
          <Icon
            name='sort'
            style={{ cursor: 'pointer' }}
            onClick={() => sortItem('firstname')}
          />
        </div>
      ),
      dataIndex: 'name',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
    },
    {
      key: 'id',
      render: id => id,
    },
    {
      title: '',
      key: 'action',
      render: id => (
        <Customdiv key={selectedRowKeys.length}>
          <Button style={{ backgroundColor: '#1AB433', border: '0.8px solid #1AB433' }} onClick={() => handleApprove(id)}>Approve</Button>
          <Button style={{ backgroundColor: '#CA5353', border: '0.8px solid #CA5353' }} onClick={() => handleReject(id)}>Reject</Button>
        </Customdiv>
      ),
    },
  ]

  const data = []
  waitApprove.toJS().map((s) => {
    data.push({
      key: s.auto_id,
      student_id: s.std_id,
      name: `${s.firstname} ${s.lastname}`,
      status: s.status,
      id: s.auto_id,
      subject: `${s.subject_code} ${s.subject_name}`,
    })
  })

  if (filter.section !== null) {
    columns.splice(2, 0,
      {
        title: 'SUBJECT',
        dataIndex: 'subject',
      })
  }
  
  return (
    <Column>
      <Wrapper>
        <Column>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginBottom: 16, flex: 1 }}>
                <CustomClear type='dashed' onClick={start} disabled={!hasSelected} loading={loading}>
                  CLEAR
                </CustomClear>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
              </div>
              <Customdiv style={{ paddingRight: '16px' }}>
                <CustomApprove type='dashed' onClick={() => handleApproveSubjects('A')} selectedRowKeys={selectedRowKeys.length}>
                  APPROVE
                </CustomApprove>
                <CustomReject type='dashed' onClick={() => handleApproveSubjects('R')} selectedRowKeys={selectedRowKeys.length}>
                  REJECT
                </CustomReject>
              </Customdiv>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        </Column>
      </Wrapper>
    </Column>
  )
}

export default ListStudent

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 86px;
    height: 34px;
    font-size: 14px;
    margin-right: 23px;
    border-radius: 24px;
    box-sizing: border-box;
    color: #ffff !important;
    :hover {
      background-color: #ffff !important;
      color: rgba(0,0,0,.65) !important;
    }
  }

  .antd-table {
    font-family: kanit;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6px;
  width: 100%;
`

const CustomClear = styled(Button)`
  background-color: #737373 !important;
  color: #8d9193;
  border: 0.8px solid #737373;
`

const CustomApprove = styled(Button)`
  background-color: #1AB433;
  border: 0.8px solid #1AB433;
  display: ${p => (p.selectedRowKeys === 0 ? 'none' : 'inline')};
`

const CustomReject = styled(Button)`
  background-color: #CA5353;
  border: 0.8px solid #CA5353;
  display: ${p => (p.selectedRowKeys === 0 ? 'none' : 'inline')};
`
const Customdiv = styled.div`
display: flex;
justify-content: flex-end;
`
