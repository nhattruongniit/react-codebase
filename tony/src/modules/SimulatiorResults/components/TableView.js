import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import EditableName from 'components/common/DashboardGrid/EditableName';
import moment from 'moment';
import { DataTable, Checkbox } from 'carbon-components-react';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import PopoverButton from 'components/common/PopoverButton';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';
import { openChart } from '../reducers/simulationResult';

const {
  TableRow,
  TableCell,
} = DataTable;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NameStyled = styled.div`
  cursor: pointer;
  text-decoration: underline;
`

const TableRowStyled = styled(TableRow)`
  ${props => (props.isFile && !props.isExpand) && css`
    display: none
  `}
`

const ViewTableRow = ({
  rowData,
  isSelected,
  selectItem,
  setItemName,
  viewFileFn,
  simulatorId,
  deleteFn,
  clearSelectedItemsFn,
  match,
  setModalSendViewFn,
  isExpand
}) => {
  const editableNameRef = useRef(null);
  const isFile = rowData.type === 'directory' || rowData.type === 'file';
  const formatDate = dateString => moment(dateString).format('DD MMM YYYY');
  const formatTime = dateString =>  moment(dateString).format('HH:mm');

  function onNameChange(name) {
    setItemName(rowData.id, name, rowData.parent_simulation_id, rowData.type, rowData.options)
  }

  function onRequestRename() {
    editableNameRef.current.editName();
  }

  const handleViewFile = () => {
    viewFileFn(simulatorId, rowData.path)
  }

  const handleOpenChart = () => {
    const { projectId, documentId, simulatorId } = match.params;
    openChart(projectId, documentId, simulatorId, rowData.id)
  }

  const handleSentToView = id => {
    clearSelectedItemsFn();
    setModalSendViewFn(true, [id])
  }

  return (
    <TableRowStyled key={String(rowData.id)} isFile={isFile} isExpand={isExpand} >
      <TableCell key={`checkbox_${rowData.id}`}>
        {isFile ? null : (
          <Checkbox
            id={`checkbox_${rowData.id}`}
            checked={isSelected}
            labelText=""
            hideLabel
            onChange={() => selectItem(rowData.id)}
          />
        )}
      </TableCell>
      <TableCell>
        <NameStyled onClick={isFile ? handleViewFile : handleOpenChart}>
          <EditableName
            name={rowData.path || rowData.chart_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        </NameStyled>
      </TableCell>
      <TableCell>
        {rowData.type}
      </TableCell>
      <TableCell>
      {rowData.size}
      </TableCell>
      <TableCell>
      {rowData.created_at && <span>{formatDate(rowData.created_at)}</span>}
      </TableCell>
      <TableCell>
        {rowData.created_at && <span>{formatTime(rowData.created_at)}</span>}
      </TableCell>
      <TableCell>
        {isFile ? null : (
          <MenuIconContainer>
            <PopoverButton
              icon={<MenuIcon />}
              content={
                <TableContextMenu>
                  <MenuItem onClick={onRequestRename}>Rename</MenuItem>
                  <MenuItem onClick={() => handleSentToView(rowData.id)}>Send to View</MenuItem>
                  <MenuItem onClick={() => deleteFn(rowData.id)}>Delete</MenuItem>
                </TableContextMenu>
              }
              height="auto"
            />
          </MenuIconContainer>
        )}
        
      </TableCell>
    </TableRowStyled>
  )
}

export default withRouter(ViewTableRow);