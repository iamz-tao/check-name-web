import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import {
  Modal, Button, Table,
} from 'antd'

const ListStudentExport = ({ handleClose, open }) => {
  const data = [{
    key: 1,
    id: '5920504522',
    name: 'project nahee',
    time: '10.31',
    status: 'on time',
  },
  {
    key: 2,
    id: '5920504522',
    name: 'project nahee',
    time: '10.31',
    status: 'on time',
  }, {
    key: 3,
    id: '5920504522',
    name: 'project nahee',
    time: '10.31',
    status: 'on time',
  },
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'TIME',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'STATUS',
      key: 'status',
      render: (text, record) => (
        <span>
          {record.status === 'ABSENT' && (
          <a style={{ color: '#FF0000' }}>{record.status}</a>
          )}
          {record.status === 'LATE' && (
          <a style={{ color: '#0029FF' }}>{record.status}</a>
          )}
          {record.status === 'ONTIME' && (
          <a>{record.status}</a>
          )}
        </span>
      ),
    },
  ]
const test = [{
  date: '20/12/2012'
},
{
  date: '21/12/2012'
},
{
  date: '22/12/2012'
},
{
  date: '23/12/2012'
}]
  // if (studentsCheckInClass) {
  //   studentsCheckInClass.get('students').map((s, i) => {
  //     data.push({
  //       key: i,
  //       id: s.get('id'),
  //       name: `${s.get('firstname')} ${s.get('lastname')}`,
  //       time: s.get('time'),
  //       status: s.get('status'),
  //     })
  //   })
  // }
// console.log(test.map(t => t.date))
  return (
    <PageWrapper>
      <Modal
        width={900}
        visible={open}
        title={(
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ItemHeaderModal>
              {' '}
                  SUBJECT NAME :
              {' '}
                  XXXXX
              {' '}
                  XXXX
            </ItemHeaderModal>
            <ItemHeaderModal>
                  SECTION NUMBER :
              {' '}
              {' '}
                  701
            </ItemHeaderModal>
          </div>
                  )}
        onCancel={handleClose}
        footer={[
          <Button key='back' onClick={handleClose}>
              Close
          </Button>,
        ]}
      >
        <div>
          {/* <Table columns={columns} pagination={{ position: 'none' }} dataSource={data} /> */}
          <div style={{border: '1px solid #dedcdc', borderRadius: '14px', padding: '8px'}}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <div style={{ width: '150px', paddingLeft: '8px'}}>ID</div>
              <div style={{ flex: 0.4, minWidth: '210px'}}>NAME</div>
              {test.map(t => {
                return(<div style={{ width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{t.date}</div>)
              })}
              
              <div style={{ width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>TOTAL</div>
            </div>
            <br/>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <div style={{ width: '150px', paddingLeft: '8px'}}>5920545211</div>
              <div style={{ flex: 0.4}}>Phiyada Srikhenkan</div>
              <div style={{ width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>1</div>
              <div style={{ width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>10</div>
            </div>
          </div>
        </div>
      </Modal>
        )}
    </PageWrapper>
  )
}

export default ListStudentExport

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

const ItemHeaderModal = styled.span`
  font-family: kanit;
  font-size: 14px;
  margin: 0;
  color: #3d3d3d;
  font-weight: lighter;
`


// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
// import { Table, Switch, Radio, Form } from 'antd';
// import { DownOutlined } from '@ant-design/icons';

// const test = [{
//   title: '21/12/2012',
//     dataIndex: '1'
// },
// {
//   title: '21/12/2012',
//     dataIndex: '1'
// },
// {
//   title: '21/12/2012',
//     dataIndex: '1'
// },
// {
//   title: '21/12/2012',
//     dataIndex: '1'
// }]

// const columnss = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     filters: [
//       {
//         text: 'London',
//         value: 'London',
//       },
//       {
//         text: 'New York',
//         value: 'New York',
//       },
//     ],
//     onFilter: (value, record) => record.address.indexOf(value) === 0,
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     sorter: true,
//     filters: [],
//     onFilter: () => {},
//     render: () => (
//       <span>
//         <a style={{ marginRight: 16 }}>Delete</a>
//         <a className="ant-dropdown-link">
//           More actions <DownOutlined />
//         </a>
//       </span>
//     ),
//   },
// ];

// const columns = [...test, ...columnss]

// const data = [];
// for (let i = 1; i <= 10; i++) {
//   data.push({
//     key: i,
//     name: 'John Brown',
//     age: `${i}2`,
//     address: `New York No. ${i} Lake Park`,
//     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//   });
// }

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
// const title = () => 'Here is title';
// const showHeader = true;
// const footer = () => 'Here is footer';
// const pagination = { position: 'bottom' };

// class Demo extends React.Component {
//   state = {
//     bordered: false,
//     loading: false,
//     pagination,
//     size: 'default',
//     expandable,
//     title: undefined,
//     showHeader,
//     footer,
//     rowSelection: {},
//     scroll: undefined,
//     hasData: true,
//     tableLayout: undefined,
//     xScroll: 'scroll,'
//   };

//   handleYScrollChange = enable => {
//     this.setState({ yScroll: enable });
//   };

//   handleXScrollChange = e => {
//     this.setState({ xScroll: e.target.value });
//   };

//   handleDataChange = hasData => {
//     this.setState({ hasData });
//   };

//   handlePaginationChange = e => {
//     const { value } = e.target;
//     this.setState({
//       pagination: value === 'none' ? false : { position: value },
//     });
//   };

//   render() {
//     const { xScroll, yScroll, ...state } = this.state;

//     const scroll = {};
//     if (yScroll) {
//       scroll.y = 240;
//     }
//     if (xScroll) {
//       scroll.x = '100vw';
//     }

//     const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
//     if (xScroll === 'fixed') {
//       tableColumns[0].fixed = true;
//       tableColumns[tableColumns.length - 1].fixed = 'right';
//     }

//     return (
//       <div>
//         {/* <Form
//           layout="inline"
//           className="components-table-demo-control-bar"
//           style={{ marginBottom: 16 }}
//         >
//           <Form.Item label="Table Scroll">
//             <Radio.Group value={xScroll} onChange={this.handleXScrollChange}>
//               <Radio.Button value={undefined}>Unset</Radio.Button>
//               <Radio.Button value="scroll">Scroll</Radio.Button>
//               <Radio.Button value="fixed">Fixed Columns</Radio.Button>
//             </Radio.Group>
//           </Form.Item>
//         </Form> */}
//         <Table
//           {...this.state}
//           columns={tableColumns}
//           dataSource={state.hasData ? data : null}
//           scroll={scroll}
//         />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<Demo />, document.getElementById('container'));