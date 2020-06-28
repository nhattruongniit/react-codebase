import React from 'react';
import { DataTable, Checkbox } from 'carbon-components-react';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { DASHBOARD_TABLE_ROW_HEIGHT } from 'appConstants';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeader,
} = DataTable;

const StyledTableContainer = styled(TableContainer)`
  overflow-x: unset;
  overflow-y: unset;

  .bx--form-item.bx--checkbox-wrapper:first-of-type {
    margin-top: 3px;
  }
  .bx--data-table-v2 td:nth-child(2) {
    width: 300px;
    word-break: break-all;
  }

  ${props => props.rowHeight === DASHBOARD_TABLE_ROW_HEIGHT.SHORT && css`
    .bx--data-table-v2 tr {
      height: ${props => props.rowHeight === DASHBOARD_TABLE_ROW_HEIGHT.SHORT ? '30px' : '48px'}
    }
  `}
`;

const ProjectDataTable = ({
  isIndeterminateSelectAll,
  isSelectAll,
  items,
  selectedIds,
  toggleSelectAll,
  rowHeight,
  headers,
  tableRowComponent,
  GroupRowFolder,
  showOutputFolder,
  setAccordionFn,
  isExpand,
  noSortable,
  ...props
}) => {
  return (
    <DataTable
      rows={items}
      headers={headers}
      rowHeight={rowHeight}
      render={({ rows, headers, getHeaderProps }) => (
        <StyledTableContainer rowHeight={rowHeight}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader key="checkbox_all" >
                  <Checkbox
                    id="checkbox_all"
                    checked={isSelectAll}
                    labelText=""
                    hideLabel
                    onChange={toggleSelectAll}
                    indeterminate={isIndeterminateSelectAll}
                  />
                </TableHeader>
                {noSortable ? (
                  <>
                    {headers.map(header => (
                      <TableHeader>
                        {header.header}
                      </TableHeader>
                    ))}
                  </>
                ) : (
                  <>
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </>
                )}
                <TableHeader></TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {showOutputFolder && <GroupRowFolder isExpand={isExpand} setAccordion={setAccordionFn}/> }
              {rows.map((row, key) => {
                const isSelected = selectedIds.indexOf(row.id) !== -1;
                const TableRowComponent = tableRowComponent;
                const rowData = items.find(item => item.id === row.id);
                return (
                  <TableRowComponent
                    rowData={rowData}
                    isSelected={isSelected}
                    key={key}
                    isExpand={isExpand}
                    {...props}
                  />
                )
              })}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    />
  );
}

export default ProjectDataTable;
