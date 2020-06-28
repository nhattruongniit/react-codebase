import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import EnergyPlusImage from 'assets/images/EPlusLogo.svg';
import Overlay from './DocumentItemOverlay';
import documentScreenshot from 'assets/images/document-screenshot.png';
import EditableName from 'components/common/DashboardGrid/EditableName';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  font-size: ${props => (props.size - 30) / 10 + 10}px;
`;

const ProjectDetailsContainer = styled.div`
  position: relative;
  background: url(${props => props.background });
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  height: 17em;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ProjectInfoContainer = styled.div`
  width: 100%;
  min-height: 6em;
  display: flex;
  padding: 0.7em;
  background-color: #d9ebfd;
  align-items: center;
  white-space: nowrap;
`;

const ProjectLogo = styled.img`
  width: 5.5em;
  height: 5.5em;
  margin-right: 8px;
`;

const NameContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  margin-top: 5px;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  line-height: 1.25;
  text-align: left;
  color: #454658;
`;

const Date = styled.div`
  font-size: 1em;
  line-height: 1.3;
  text-align: left;
  color: #5a6872;
  text-transform: uppercase;
`;

const formatDate = dateString => moment(dateString).format('MMM DD, YYYY HH:mm');

const DocumentGridItem = ({
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
      <ProjectDetailsContainer
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        size={size}
        background={documentScreenshot}
      >
        { (showOverlay || isSelected) &&
          <Overlay
            id={item.id}
            isSelected={isSelected}
            onToggleSelected={selectItem}
            onRequestRename={onRequestRename}
            itemVersionId={item.version_id}
            {...props}
          />
        }

      </ProjectDetailsContainer>
      <ProjectInfoContainer>
        <ProjectLogo src={EnergyPlusImage} />
        <NameContainer>
          <EditableName
            name={item.document_name}
            onNameChange={name => setItemName(item.id, name)}
            ref={editableNameRef}
          />
          <InfoBar>
            <InfoItem>{item.simulations || 0} sims</InfoItem>
            <InfoItem>{item.charts || 0} Grs</InfoItem>
            <Date>{formatDate(item.updated_at)}</Date>
          </InfoBar>
        </NameContainer>
      </ProjectInfoContainer>
    </Container>
  )
}

export default DocumentGridItem;
