import React from 'react'
import styled from 'styled-components'
import {
  Modal, Button,
} from 'antd'

const ListStudentExport = ({ handleClose, open, subject_code, handleExport }) => {
  const attendanceSheet = {
    section_name: 'Project3',
    section: '700',
    total_mark: '10',
    class: [
      {
        id: 'JIectO0CFzYQwkPIob03',
        date: '22/04/2020',
      },
      {
        id: 'jhKX8QbRobsxlUWwoMod',
        date: '23/04/2020',
      },
      {
        id: 'FJhpy3g8wFauRGytitfR',
        date: '24/04/2020',
      },
    ],
    student: [
      {
        id: '5920501848',
        student: 'nisit test',
        date: '24/04/2020',
        score: 0,
      },
      {
        id: '5920501995',
        student: 'boon boon',
        date: '24/04/2020',
        score: 0,
      },
      {
        id: '5920501979',
        student: 'thanakit haruehansapong',
        date: '24/04/2020',
        score: 0,
      },
      {
        id: '5920504243',
        student: 'Nantipaht Tubjit',
        date: '24/04/2020',
        score: 1,
      },
      {
        id: '5920501848',
        student: 'nisit test',
        date: '23/04/2020',
        score: 0,
      },
      {
        id: '5920501995',
        student: 'boon boon',
        date: '23/04/2020',
        score: 0.5,
      },
      {
        id: '5920501979',
        student: 'thanakit haruehansapong',
        date: '23/04/2020',
        score: 0,
      },
      {
        id: '5920504243',
        student: 'Nantipaht Tubjit',
        date: '23/04/2020',
        score: 0,
      },
      {
        id: '5920501848',
        student: 'nisit test',
        date: '22/04/2020',
        score: 0,
      },
      {
        id: '5920501995',
        student: 'boon boon',
        date: '22/04/2020',
        score: 0,
      },
      {
        id: '5920501979',
        student: 'thanakit haruehansapong',
        date: '22/04/2020',
        score: 1,
      },
      {
        id: '5920504243',
        student: 'Nantipaht Tubjit',
        date: '22/04/2020',
        score: 0,
      },
    ],
  }

  const test = []
  attendanceSheet.class.map((a) => {
    test.push({
      date: a.date,
    })
  })

  //remove id dup
  const idStd = [...new Set(idStd)]
  attendanceSheet.student.map((s) => {
    idStd.push(
      s.id,
    )
  })
  const id = [...new Set(idStd)]
  const dataStd = id.map(s => attendanceSheet.student.filter(ss => ss.id === s))

  const pl = attendanceSheet.student.reduce((accum, curr) => {
    accum[curr.id] = {
      ...accum[curr.date],
      // date: curr.score,
      [curr.date]: curr.score,
    }
    return accum
  }, {})
  const q = []
  dataStd.map((z, i) => {
    q.push({
      name: z[0].student,
      id: z[0].id,
      date: z.map(s => s.date),
      score: z.map(s => s.score),
      sum: (z.map(s => s.score).reduce((a, b) => a + b, 0) * z.map(s => s.score).length) / parseInt(attendanceSheet.total_mark, 10),
    })
  })
  // const zzdate= Object.keys(dateAtten).map(i => pl[i])


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
              {attendanceSheet.section_name}
            </ItemHeaderModal>
            <ItemHeaderModal>
                  SECTION NUMBER :
              {' '}
              {' '}
              {attendanceSheet.section}
            </ItemHeaderModal>
          </div>
                  )}
        onCancel={handleClose}
        footer={[
          <Button key='back' onClick={handleClose}>
              Close
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleExport(attendanceSheet.section_name,attendanceSheet.section)}>
          Submit
        </Button>,
        ]}
      >
        <div>
          <div style={{ border: '1px solid #dedcdc', borderRadius: '14px', padding: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '150px', paddingLeft: '8px' }}>ID</div>
              <div style={{ flex: 0.4, minWidth: '210px' }}>NAME</div>

              {test.map(t => (
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
            q.map(qq => (
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
                  {qq.sum}
                </div>
              </div>
            ))
          }
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
