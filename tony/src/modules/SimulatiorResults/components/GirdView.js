import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Scrennshot from 'assets/images/document-screenshot.png';
import Overlay from './Overlay';
import EditableName from 'components/common/DashboardGrid/EditableName';
import ReportIcon from '@carbon/icons-react/es/report/16';
import FolderIcon from '@carbon/icons-react/es/folder/16';
import ChartBarIcon from '@carbon/icons-react/es/chart--bar/16';
import ChartLineIcon from '@carbon/icons-react/es/chart--line/16';
import ChartPieIcon from '@carbon/icons-react/es/chart--pie/16';
import ChartScatterIcon from '@carbon/icons-react/es/chart--scatter/16';

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
  justify-content: space-between;
  padding: 1em;
  background-color: #d9ebfd;
  align-items: center;
  white-space: nowrap;
`;

const StyledIcon = styled.div`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

const LeftStyled = styled.div`
  display: flex;
  align-items: center;
`

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
  const formatTime = dateString => moment(dateString).format('HH:mm A');
  const isFile = item.type === 'directory' || item.type === 'file';

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
        {(showOverlay || isSelected) && (
          <Overlay
            id={item.id}
            fileName={item.path}
            isSelected={isSelected}
            onToggleSelected={selectItem}
            onRequestRename={onRequestRename}
            isFile={isFile}
            {...props}
          />
        )}
        <ChartImage showOverlay={showOverlay} src={Scrennshot} />
      </ViewDetailsContainer>
      <ViewInfoContainer>
        <LeftStyled>
          <StyledIcon>
            {item.type === 'directory' && <FolderIcon />}
            {item.type === 'file' && <ReportIcon />}
            {(item.type === 'bar' || item.type === 'bar chart') && <ChartBarIcon />}
            {(item.type === 'line' || item.type === 'line chart') && <ChartLineIcon />}
            {(item.type === 'pie' || item.type === 'pie chart') && <ChartPieIcon />}
            {(item.type === 'radar' || item.type === 'radar chart') && <ChartScatterIcon />}
          </StyledIcon>
          <EditableName
            name={item.path || item.chart_name}
            onNameChange={name => setItemName(item.id, name, item.parent_simulation_id, item.type, item.options)}
            ref={editableNameRef}
          />
        </LeftStyled>
        <div>
          {item.created_at && <span>{formatTime(item.created_at)}</span>}
        </div>
      </ViewInfoContainer>
    </Container>
  )
}

export default ViewGridItem;
