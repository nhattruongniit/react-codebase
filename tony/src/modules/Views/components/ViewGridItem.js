import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import FolderIcon from 'assets/images/document-screenshot.png';
import IconViews from 'assets/images/IconViewsBlue.svg';
import Overlay from './Overlay';
import EditableName from 'components/common/DashboardGrid/EditableName';

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
  height: 6em;
  display: flex;
  padding: 0.7em;
  background-color: #d9ebfd;
  align-items: center;
  white-space: nowrap;
`;

const ViewLogo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-right: 10px;
`;

const NameContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

const VersionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  margin-top: 5px;
`;

const ChartsStyled = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5px;
  p {
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1.25;
    text-align: left;
    color: #454658;
    & + p {
      margin-left: 20px;
    }
  }
`;

const Date = styled.div`
  font-size: 1em;
  line-height: 1.3;
  text-align: left;
  color: #5a6872;
  text-transform: uppercase;
`;

const formatDate = dateString => moment(dateString).format('MMM DD, YYYY HH:mm');

const ViewGridItem = ({
  item,
  isSelected,
  selectItem,
  size,
  setItemName,
  duplicateViewFn,
  ...props
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const editableNameRef = React.useRef();
  const amountChart = (Array.isArray(item.charts) && item.charts.length) || item.charts

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
            id={item.id}
            isSelected={isSelected}
            onToggleSelected={selectItem}
            onRequestRename={onRequestRename}
            duplicateViewFn={duplicateViewFn}
            {...props}
          />
        }
        <ChartImage showOverlay={showOverlay} src={FolderIcon} />
      </ViewDetailsContainer>
      <ViewInfoContainer>
        <ViewLogo>
          <img src={IconViews} title="Icon" alt="Icon" />
        </ViewLogo>
        <NameContainer>
          <EditableName
            name={item.view_name}
            onNameChange={name => setItemName(item.id, name)}
            ref={editableNameRef}
          />
          <VersionBar>
            <ChartsStyled>
              <p>{amountChart} {Number(amountChart) > 1 ? "Charts" : "Chart"}</p>
              <p>{item.simulations}  {Number(item.simulations) > 1 ? "Sims" : "Sim"}</p>
            </ChartsStyled>
            <Date>{formatDate(item.updated_at)}</Date>
          </VersionBar>
        </NameContainer>
      </ViewInfoContainer>
    </Container>
  )
}

export default ViewGridItem;
