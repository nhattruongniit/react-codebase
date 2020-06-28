import React, { useRef } from 'react';
import styled from 'styled-components';
import EditableName from 'components/common/DashboardGrid/EditableName';
import moment from 'moment';
import { DataTable, Checkbox } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import PopoverButton from 'components/common/PopoverButton';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  duplicateViewFn
}) => {
  const editableNameRef = useRef(null);
  const amountChart = (Array.isArray(rowData.charts) && rowData.charts.length) || rowData.charts

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
        <Link to={`/dashboard/${rowData.project_id}/views/${rowData.id}/charts`}>
          <EditableName
            name={rowData.view_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        </Link>

      </TableCell>
      <TableCell>
        {amountChart}
      </TableCell>
      <TableCell>
        {rowData.simulations || 0}
      </TableCell>
      <TableCell>
        {moment(rowData.updated_at).fromNow()}
      </TableCell>
      <TableCell>
        <MenuIconContainer>
          <PopoverButton
            icon={<MenuIcon />}
            content={
              <TableContextMenu>
                <MenuItem onClick={onRequestRename}>Rename</MenuItem>
                <MenuItem onClick={() => duplicateViewFn(rowData.id)}>Duplicate</MenuItem>
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