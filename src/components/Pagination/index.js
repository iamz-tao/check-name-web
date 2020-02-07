import React from 'react'
import styled from 'styled-components'
// import { Pagination, Item as SemanticItem } from 'semantic-ui-react'
// import shortid from 'shortid'
import get from 'lodash/get'
import { Pagination } from 'antd'

const CustomPagination = ({ ...newProps }) => {
  const handleOnPageChange = get(newProps, 'handleOnPageChange')
  const activePage = get(newProps, 'activePage')
  const totalItems = get(newProps, 'totalItems')
  const itemPerPage = get(newProps, 'itemPerPage')
  const totalPages = get(newProps, 'totalPages')
  // const color = get(newProps, 'color')
  return (
    <div>
      <StyleFullPagination totalPages={totalPages}>
        <Pagination
          current={activePage}
          onChange={handleOnPageChange}
          total={totalItems}
          pageSize={itemPerPage}
          defaultPageSize={totalItems}
        />
      </StyleFullPagination>
      <StylePagination totalPages={totalPages}>
        <Pagination
          simple
          current={activePage}
          onChange={handleOnPageChange}
          total={totalItems}
          pageSize={itemPerPage}
          defaultPageSize={totalItems}
        />
      </StylePagination>
    </div>
    // <TransparentPagination
    //   totalPages={totalPages}
    //   activePage={activePage || 1}
    //   firstItem={null}
    //   lastItem={null}
    //   pageItem={(Item, { value, active, ...props }) => (
    //     <PageItem
    //       {...props}
    //       isactive={active.toString()}
    //       color={color}
    //       content={value}
    //       // active={(activePage === value).toString()}
    //       onClick={() => handleOnPageChange(value)}
    //     />
    //   )}
    //   prevItem={(Item, { value, active, ...props }) => (
    //     <PageItem
    //       {...props}
    //       isactive={active.toString()}
    //       color={color}
    //       content='⟨'
    //       onClick={() => handleOnPageChange(value)}
    //     />
    //   )}
    //   nextItem={(Item, { value, active, ...props }) => (
    //     <PageItem
    //       {...props}
    //       isactive={active.toString()}
    //       color={color}
    //       content='⟩'
    //       onClick={() => handleOnPageChange(value)}
    //     />
    //   )}
    //   ellipsisItem={(Item, { value, active, ...props }) => (
    //     <EllipsisItem
    //       {...props}
    //       isactive={active.toString()}
    //       key={shortid.generate()}
    //       color={color}
    //       content='. . .'
    //       onClick={() => handleOnPageChange(value)}
    //     />
    //   )}
    // />
  )
}
export default CustomPagination

// const TransparentPagination = styled(Pagination)`
//   border: none !important;
//   box-shadow: none !important;
//   background: transparent !important;
// `
// const PageItem = styled(SemanticItem)`
//   margin: 0 10px;
//   margin-top: 13px;

//   color: ${props => (props.isactive === 'true' ? 'white' : props.color)} !important;
//   font-weight: bold !important;

//   background: ${props => (props.isactive === 'true' ? props.color : 'white')} !important;

//   border-radius: 5px !important;
//   border: 1px solid #e1e1e1;
//   box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);

//   cursor: pointer;

//   &:first-child {
//     margin-left: 0;
//   }

//   &:last-child {
//     margin-right: 0;
//   }

//   :hover {
//     background:
// ${props => (props.isactive === 'true' ? props.color : 'rgba(0,0,0,.03)')} !important;
//   }

//   &:before {
//     width: 0px !important;
//   }
// `
// const EllipsisItem = styled(SemanticItem)`
//   background: transparent !important;
//   font-weight: bold !important;
//   color: #808285 !important;
//   cursor: pointer;
//   &:before {
//     width: 0px !important;
//   }
// `

// This is full pagination
const StyleFullPagination = styled.div`
  display: ${p => (p.totalPages <= 1 ? 'none' : 'flex')};
  .ant-pagination-next .ant-pagination-item-link, .ant-pagination-prev .ant-pagination-item-link {
    border: 1px solid #E1E1E1;
    box-shadow: 0px 3px 6px #77777719;
}
.ant-pagination-next a, .ant-pagination-prev a {
    color: ${props => props.theme.colors.primary};
}
  .ant-pagination-item {
    border: 1px solid #E1E1E1;
    box-shadow: 0px 3px 6px #77777719;
}
.ant-pagination-item a {
    color: ${props => props.theme.colors.primary};
}
.ant-pagination-item-active {
    font-weight: 500;
    background: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary}; 
    box-shadow: 0px 3px 6px #77777719;
}
.ant-pagination-item-active a {
    color: ${props => props.theme.colors.white} !important;
}
@media (max-width: 586px) {
  display: none;
}
`

//This is minimal pagination
const StylePagination = styled.div`
  display: none;
@media (max-width: 586px) {
  display:  ${p => (p.totalPages <= 1 ? 'none' : 'flex')};
  margin-top: 10px;
  .ant-pagination, .ant-pagination ol, .ant-pagination ul {
    display: flex;
  }
.ant-pagination-simple .ant-pagination-next .ant-pagination-item-link, .ant-pagination-simple .ant-pagination-prev .ant-pagination-item-link {
    height: 30px;
}
.ant-pagination-simple .ant-pagination-next, .ant-pagination-simple .ant-pagination-prev {
    height: 30px;
    line-height: 30px;
}
.ant-pagination-simple .ant-pagination-simple-pager {
    display: flex;
    align-items: center;
    height: 30px;
}
.ant-pagination-simple .ant-pagination-simple-pager input:hover {
    border-color:  #d9d9d9;
}
.ant-pagination-simple .ant-pagination-simple-pager {
    margin-right: 18px;
}
.ant-pagination-slash {
    margin: 0 15px 0 15px;
}
}
`
