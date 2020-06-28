import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import FolderIcon from 'assets/images/slim-folder-icon.svg';
import EnergyPlusImage from 'assets/images/EPlusLogo.svg';
import Overlay from 'components/common/DashboardGrid/Overlay';
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
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em;
  height: 17em;
`;

const FolderImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #3d70b2;
  width: 14em;
  max-width: 80%;
  height: 80%;
`;

const AttributeContainer = styled.div`
  width: 10em;
  margin-top: 10px;
`;

const AttributeRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8em;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AttributeLabel = styled.div`
  font-size: 1.15em;
  line-height: 0.92;
  text-align: left;
  color: #152935;
`;

const AttributeValue = styled.div`
  font-size: 1.15em;
  font-weight: 600;
  line-height: 1;
  text-align: right;
  color: #152935;
`;

const ProjectInfoContainer = styled.div`
  width: 100%;
  height: 6em;
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

const VersionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  margin-top: 5px;
`;

const Version = styled.div`
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

const ProjectGridItem = ({
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
      >
        { (showOverlay || isSelected) &&
          <Overlay
            id={item.id}
            itemVersionId={item.version_id}
            isSelected={isSelected}
            onToggleSelected={selectItem}
            onRequestRename={onRequestRename}
            {...props}
          />
        }
        <FolderImage src={FolderIcon} />
        <AttributeContainer>
          <AttributeRow>
            <AttributeLabel>IDF Docs</AttributeLabel>
            <AttributeValue>{item.idf_documents}</AttributeValue>
          </AttributeRow>
          <AttributeRow>
            <AttributeLabel>Simulations</AttributeLabel>
            <AttributeValue>{item.simulations}</AttributeValue>
          </AttributeRow>
          <AttributeRow>
            <AttributeLabel>Graphs</AttributeLabel>
            <AttributeValue>{item.charts}</AttributeValue>
          </AttributeRow>
        </AttributeContainer>
      </ProjectDetailsContainer>
      <ProjectInfoContainer>
        <ProjectLogo src={EnergyPlusImage} />
        <NameContainer>
          <EditableName
            name={item.project_name}
            onNameChange={name => setItemName(item.id, name)}
            ref={editableNameRef}
          />
          <VersionBar>
            <Version>v {item.version}</Version>
            <Date>{formatDate(item.updated_at)}</Date>
          </VersionBar>
        </NameContainer>
      </ProjectInfoContainer>
    </Container>
  )
}

export default ProjectGridItem;
