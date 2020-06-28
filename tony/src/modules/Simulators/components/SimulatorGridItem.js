import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import FolderIcon from 'assets/images/document-screenshot.png';
import Overlay from './Overlay';
import EditableName from 'components/common/DashboardGrid/EditableName';

// component
import LogSymbol from '../../../components/common/LogSymbol';
import ProgressBar from '../../../components/common/ProgressBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  font-size: ${props => (props.size - 30) / 10 + 10}px;
`;

const ViewDetailsContainer = styled.div`
  position: relative;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  height: 17em;
`;

const ChartImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #3d70b2;
  width: 14em;
  max-width: 80%;
  height: 80%;
  opacity: ${props => props.showOverlay ? 0.5 : 1};
`;

const ViewInfoContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 1em;
  background-color: #d9ebfd;
  align-items: center;
  white-space: nowrap;
`;

const NameContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

const StyledOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Date = styled.div`
  font-size: 1em;
  line-height: 1.3;
  text-align: left;
  color: #5a6872;
  width: 50%;
`;

const TopStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const StatusStyled = styled.div`
  width: 33%;
  text-align: right;
  span {
    font-size: 10px;
    color: #5A6872;
  }
`

const ProcessStyled = styled.div`
  display: flex;
  align-items: center;
  color: #5A6872;
  margin-bottom: 10px;
`

const DateStyled = styled.div`
  width: 33%;
  margin-left: 10px;
`

const StyledTextProgress = styled.div `
 margin-right: 10px;
`

const formatDate = dateString => moment(dateString).format('DD MMMM YYYY');
const formatTime = dateString => moment(dateString).format('HH:mm:ss');

const ViewGridItem = ({
  item,
  isSelected,
  selectItem,
  size,
  setItemName,
  ...props
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const editableNameRef = React.useRef();

  function onRequestRename() {
    editableNameRef.current.editName();
  }

  return (
    <Container size={size}>
      <ViewDetailsContainer
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        size={size}
      >
        { (showOverlay || isSelected) &&
          <Overlay
            simulatorId={item.id}
            documentId={item.document_id}
            simulationName={item.simulation_name}
            isSelected={isSelected}
            onToggleSelected={selectItem}
            onRequestRename={onRequestRename}
            {...props}
          />
        }
        <ChartImage showOverlay={showOverlay} src={FolderIcon} />
      </ViewDetailsContainer>
      <ViewInfoContainer>
        <NameContainer>
          <TopStyled>
            <EditableName
              name={item.simulation_name}
              onNameChange={name => setItemName(item.id, name)}
              ref={editableNameRef}
            />
            <DateStyled>
              {formatDate(item.created_at)}
            </DateStyled>
            <StatusStyled>
              <span>{item.size !== "0" && item.size} </span>
            </StatusStyled>
          </TopStyled>
          <ProcessStyled>
            <StyledTextProgress>In process</StyledTextProgress>
            <ProgressBar  item={item} />
          </ProcessStyled>
          <StyledOption>
            <Date>{formatTime(item.created_at)} min</Date>
            <LogSymbol item={item} />
          </StyledOption>
        </NameContainer>
      </ViewInfoContainer>
    </Container>
  )
}

export default ViewGridItem;
