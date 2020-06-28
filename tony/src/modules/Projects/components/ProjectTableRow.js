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
  a {
    text-decoration: none;
    color: #152934;
  }
`;

const {
  TableRow,
  TableCell,
} = DataTable;

const ProjectTableRow = ({
  rowData,
  duplicateFn,
  upgradeFn,
  deleteFn,
  maxIdfVersion,
  isSelected,
  selectItem,
  setItemName,
}) => {

  const editableNameRef = useRef(null);

  function onNameChange(name) {
    setItemName(rowData.id, name);
  }

  function onRequestRename() {
    editableNameRef.current.editName();
  }


  const isUpgradeable = rowData.version_id < maxIdfVersion;

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
        <Link to={`/dashboard/${rowData.id}/documents`}>
          <EditableName
            name={rowData.project_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        </Link>

      </TableCell>
      <TableCell>
        {rowData.version}
      </TableCell>
      <TableCell>
        {rowData.idf_documents || 0}
      </TableCell>
      <TableCell>
        {rowData.simulations || 0}
      </TableCell>
      <TableCell>
        {rowData.graphs || 0}
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
                <MenuItem onClick={() => duplicateFn(rowData.id)}>Duplicate</MenuItem>
                <MenuItem disabled={!isUpgradeable} onClick={() => {
                  if (isUpgradeable) {
                    upgradeFn(rowData.id);
                  }
                }}>
                  Upgrade IDF Version
                </MenuItem>
                <MenuItem onClick={() => deleteFn(rowData.id)}>Delete</MenuItem>
                <MenuItem>
                  <Link to={`/dashboard/${rowData.id}/views`}>
                    Go to Views
                  </Link>
                </MenuItem>
              </TableContextMenu>
            }
          />
        </MenuIconContainer>
      </TableCell>
    </TableRow>
  )
}

export default ProjectTableRow;