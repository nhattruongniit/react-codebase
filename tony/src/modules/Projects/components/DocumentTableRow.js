import React, { useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DataTable, Checkbox } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--horizontal/16';
import EditableName from 'components/common/DashboardGrid/EditableName';
import PopoverButton from 'components/common/PopoverButton';
import TableContextMenu, { MenuItem } from 'components/common/DashboardTable/TableContextMenu';

const {
  TableRow,
  TableCell,
} = DataTable;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ShortcutStyled = styled(Link)`
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  color: #063571;
  font-size: 17px;
  display: none;
  &+& {
    padding-left: 15px;
  }
  span {
    font-size: 9px;
  }
`
const TableRowStyled = styled(TableRow)`
  &:hover {
    td a {
      display: inline-block;
    }
  }
  td:nth-child(3) {
    width: 400px;
  }
`

const DocumentTableRow = ({
  rowData,
  duplicateFn,
  upgradeFn,
  deleteFn,
  maxIdfVersion,
  isSelected,
  selectItem,
  setItemName,
  projectId,
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
    <TableRowStyled key={rowData.id}>
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
        <Link to={`/dashboard/${projectId}/documents/${rowData.id}/editor`}>
          <EditableName
            name={rowData.document_name}
            onNameChange={onNameChange}
            ref={editableNameRef}
          />
        </Link>
      </TableCell>
      <TableCell>
        <ShortcutStyled to={`/dashboard/${projectId}/documents/${rowData.id}/editor`}>3D</ShortcutStyled>
        <ShortcutStyled to={`/dashboard/${projectId}/documents/${rowData.id}/idf-editor`}>IDF</ShortcutStyled>
        <ShortcutStyled to={`/dashboard/${projectId}/documents/${rowData.id}/simulator`}>SiM</ShortcutStyled>
        <ShortcutStyled to={`/dashboard/${projectId}/views`}>Vi<span>ews</span></ShortcutStyled>
        <ShortcutStyled>R<span>ES</span></ShortcutStyled>
        <ShortcutStyled>C<span>Edit</span></ShortcutStyled>
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
              </TableContextMenu>
            }
            height="auto"
          />
        </MenuIconContainer>
      </TableCell>
    </TableRowStyled>
  )
}

export default DocumentTableRow;