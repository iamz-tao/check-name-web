import React from 'react'
import styled from 'styled-components'
import {
  Modal, Button,
} from 'antd'

import LoadingPulse from '~/components/LoadingPulse'

const ListStudentExport = ({
  handleClose, open, subject_code, handleExport, attendanceSheet,
}) => {
  
  // console.log(attendanceSheet)
  if (!attendanceSheet) {
    return (
    <LoadingPulse />
    )
  }

  const  attendanceSheets = attendanceSheet.toJS()
  const classOpen = []
  const idStd = []
  const xx = []
  attendanceSheets.class.map((a) => {
    classOpen.push({
      date: a.date,
      id: a.id,
    })
  })

  const dateOpen = classOpen.map(s => attendanceSheets.student.filter(ss => ss.date === s.date))
  // console.log('dateOpen',dateOpen[0])

  //remove id dup

  attendanceSheets.student.map((s) => {
    idStd.push(
      s.id,
    )
  })
  // id std
  const id = [...new Set(idStd)]

  const filteredArr = dateOpen.map(data => data.reduce((acc, current, index) => {
    const x = acc.find(item => item.id === current.id)
    //console.log(index)
    if (!x) {
      return acc.concat([current])
    }
    const a = acc.find(item => item.id === x.id)
    Object.assign(a, { score: x.score += current.score })
    return acc
  }, []))
  const all = filteredArr.reduce((acc, val) => [...acc, ...val])
  //  console.log('all',all)
  const aaa = []
  all.map((al) => {
    all.map((a) => {
      if (al.id === a.id && al.date !== a.date) {
        aaa.push({
          id: al.id,
          date: [
            al.date, a.date,
          ],
          name: al.student,
          score: [
            al.score, a.score,
          ],
        })
      } else {
        aaa.push({
          id: al.id,
          date: [
            al.date,
          ],
          name: al.student,
          score: [
            al.score,
          ],
        })
      }
    })
  })
  console.log('ssss',aaa)

  const data = aaa.reduce((acc, current, index) => {
    const x = acc.find(item => item.id === current.id)
    //console.log(index)
    if (!x) {
      return acc.concat([current])
    }

    return acc
  }, [])
  console.log(data)


  const section_name = attendanceSheets ? attendanceSheets.section_name : '-'
  const section = attendanceSheets ? attendanceSheets.section : '-'
  // console.log(dataStd)
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
              {subject_code}
              {' '}
              {section_name}
            </ItemHeaderModal>
            <ItemHeaderModal>
                  SECTION NUMBER :
              {' '}
              {' '}
              {section}
            </ItemHeaderModal>
          </div>
                  )}
        onCancel={handleClose}
        footer={[
          <Button key='back' onClick={handleClose}>
              Close
          </Button>,
          <Button disabled={!attendanceSheets} key='submit' type='primary' onClick={() => handleExport(section_name, section)}>
          Submit
          </Button>,
        ]}
      >

        <div>
          {/* {!attendanceSheet && (
            <LoadingPulse />
          )} */}

          {attendanceSheets && (
          <div>
            <div style={{ border: '1px solid #dedcdc', borderRadius: '14px', padding: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '150px', paddingLeft: '8px' }}>ID</div>
                <div style={{ flex: 0.4, minWidth: '210px' }}>NAME</div>

                {classOpen.map(t => (
                  <div style={{
                    width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    {t.date}
                  </div>
                ))}

                <div style={{
                  width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                >
TOTAL
                </div>
              </div>
              <br />
              {
            data.map(qq => (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '150px', paddingLeft: '8px' }}>{qq.id}</div>
                <div style={{ flex: 0.4, minWidth: '210px' }}>{qq.name}</div>
                {qq.score.map(s => (
                  <div style={{
                    width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  >
                    {s}
                  </div>
                ))}


                <div style={{
                  width: '86px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                >
                  {/* {qq.sum} */}
4

                </div>
              </div>
            ))
          }
            </div>
          </div>

          )}
        </div>

      </Modal>
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
