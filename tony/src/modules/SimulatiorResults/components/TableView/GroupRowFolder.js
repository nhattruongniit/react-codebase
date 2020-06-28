import React, { useRef } from 'react';
import styled from 'styled-components';
import { DataTable, Checkbox } from 'carbon-components-react';
import AddIcon from '@carbon/icons-react/es/add/16';
import SubtractIcon from '@carbon/icons-react/es/subtract/16';

const {
  TableRow,
  TableCell,
} = DataTable;

const TableRowStyled = styled(TableRow)`
  cursor: pointer;
`

const AccordionStyled = styled.div`
  height: 1.125rem;
  width: 1.125rem;
  border: 2px solid #5a6872;
  background-color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const GroupRowFolder = ({ setAccordion, isExpand }) => {
  return (
    <TableRowStyled onClick={() => setAccordion(!isExpand)}>
      <TableCell>
        <AccordionStyled>
          {isExpand ? <SubtractIcon fill="5a6872" /> : <AddIcon fill="#5a6872" />  }
        </AccordionStyled>
      </TableCell>
      <TableCell>
        <strong>Simulation Output Folder</strong>
      </TableCell>
      <TableCell>
        Folder
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRowStyled>
  )
}

export default GroupRowFolder;