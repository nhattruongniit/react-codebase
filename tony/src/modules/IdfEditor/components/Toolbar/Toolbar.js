import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Button } from 'carbon-components-react';
import IdfObjectToolbar from '../../containers/Toolbar/IdfObjectToolbar';
import ImportModal from '../../containers/ImportObject/ImportModal';
import ImportIcon from '@carbon/icons-react/es/migrate/20';
import ControlSize from '../../containers/ControlSize';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 48px;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: flex-end;
`;

const ActionButton = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const IconButton = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

const StyledSearchbox = styled(Search)`
  width: 200px;

  .bx--search-input {
    background: white;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
    color: #5a6872;
  }
`;


const IdfItemToolbar = ({
  hasSelectedObjects,
  setFilterFieldName,
  categories,
  addObject
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (event) => {
    setFilterFieldName(event.target.value);
  }
  const onClose = (event) => {
    setIsOpen(false);
    console.log(event);
  }
  const onSubmit = (event) => {
    setIsOpen(false);
  }
  const addNew = () => {
    addObject();
  }
  const importData = () => {
    setIsOpen(true);
  }
  return (
    <Container>
      { false === hasSelectedObjects &&
        <React.Fragment>
          <StyledSearchbox placeHolderText="Search" labelText="Search" onChange={onChange} />
          <ActionsContainer>
            {categories && categories.length > 0 && (
              <IconButton>
                <ImportIcon onClick={importData}></ImportIcon>
              </IconButton>
            )}
            <ActionButton>
              <ControlSize />
              <Button onClick={addNew}>Add New</Button>
            </ActionButton>
          </ActionsContainer>
        </React.Fragment>
      }
      <ImportModal open={isOpen} onClose={onClose} onSubmit={onSubmit} />

      { hasSelectedObjects &&
        <IdfObjectToolbar/>
      }

    </Container>
  );
}

export default IdfItemToolbar;
