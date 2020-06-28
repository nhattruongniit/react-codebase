import React, { useRef } from 'react';
import styled from 'styled-components';
import EditableName from 'components/common/DashboardGrid/EditableName';
import moment from 'moment';
import { DataTable, Checkbox } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import PopoverButton from 'components/common/PopoverButton';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';

// component
import LogSymbol from '../../../components/common/LogSymbol';
import ProgressBar from '../../../components/common/ProgressBar';

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > div > div{
    z-index: 1
  }
`;


const {
  TableRow,
  TableCell,
} = DataTable;

const ViewTableRow = ({
  rowData,
  deleteFn,
  isSelected,
  selectItem,
  setItemName,
  downloadFn,
  viewLogFn,
  perPage, 
  currentPage,
  setModalConvertFn,
  projectId,
  apiBaseUrl
}) => {
  const editableNameRef = useRef(null);
  const formatDate = dateString => moment(dateString).format('DD MMMM YYYY');
  const formatTime = dateString => moment(dateString).format('HH:mm:ss');

  function onNameChange(name) {
    setItemName(rowData.id, name);
  }

  function onRequestRename() {
    editableNameRef.current.editName();
  }

  return (
    <TableRow key={rowData.id}>
      <TableCell key={`checkbox_${rowData.id}`}>
        <Checkbox
          id={`checkbox_${rowData.id}`}
          checked={isSelected}
          labelText=""
          hideLabel
          onChange={() => selectItem(rowData.id)}
        />
      </TableCell>
      <TableCell>
        <Link to={`/dashboard/${projectId}/documents/${rowData.document_id}/simulator/${rowData.id}/simulation-result`}>
          <EditableName
            name={rowData.simulation_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        </Link>
      </TableCell>
      <TableCell>
        {formatDate(rowData.created_at)}
      </TableCell>
      <TableCell>
        {rowData.status === 'in progress' ? <span>In progress</span> : <span>{formatTime(rowData.created_at)} min</span>}
      </TableCell>
      <TableCell>
        {rowData.status === 'in progress' ? (
           <ProgressBar item={rowData} />
        ) : (
          <LogSymbol item={rowData} />
        )}
      </TableCell>
      <TableCell>
        {rowData.size !== "0" && rowData.size}
      </TableCell>
      <TableCell>
        {rowData.status}
      </TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            icon={<MenuIcon />}
            content={
              <TableContextMenu>
                <MenuItem onClick={onRequestRename}>Rename</MenuItem>
                <MenuItem onClick={() => setModalConvertFn(rowData.id, rowData.simulation_name, true)}>Convert to ...</MenuItem>
                <MenuItem onClick={() => viewLogFn(rowData.id, currentPage, perPage, false)}>View Log</MenuItem>
                <MenuItem onClick={() => downloadFn(apiBaseUrl, rowData.id)}>Download</MenuItem>
                <MenuItem onClick={() => deleteFn(rowData.id)}>Delete</MenuItem>
              </TableContextMenu>
            }
            height="auto"
          />
        </MenuIconContainer>
      </TableCell>
    </TableRow>
  )
}

export default ViewTableRow;