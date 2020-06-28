import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, DropdownV2, InlineLoading } from 'carbon-components-react';
import SuccessIcon from '@carbon/icons-react/es/checkmark/16';

const StyledModal = styled(Modal)`
  .bx--modal-content {
    overflow-y: ${props => props.showScrollbar ? 'auto' : 'initial'};
    padding: 0 5px;
  }
`;

const Label = styled.label`
  display: block;
  letter-spacing: normal;
  text-align: left;
  color: #152935;
  margin-bottom: 8px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const ProjectItemContainer = styled.div`
  margin-top: 20px;
`;

const ProjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-bottom: none;
  }

  &:first-child {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const StyledInlineLoading = styled(InlineLoading)`
  width: 20px;
`;

const ErrorText = styled.div`
  color: red;
  text-align: right;
`;

const UpgradeProjectModal = ({
  isShowingModal,
  isSelectingVersion,
  projects,
  versions,
  upgradeFn,
  cancelFn,
}) => {
  const [version, setVersion] = useState(null);
  const isUpgradeDone = !isSelectingVersion && !projects.find(project => project.isUpgrading === true);
  const primaryButtonText = isSelectingVersion ?
    'Upgrade' :
    isUpgradeDone ? 'Done' : 'Minimize';
  const onSubmit = () => {
    if (!version) return;
    if (isSelectingVersion) return upgradeFn(version);
    return cancelFn();
  }

  return (
    <StyledModal
      open={isShowingModal}
      modalHeading={isSelectingVersion ? 'Upgrade IDF Version' : 'Upgrade selected Projects'}
      onRequestClose={cancelFn}
      onRequestSubmit={onSubmit}
      primaryButtonText={primaryButtonText}
      secondaryButtonText="Cancel"
      id="upgrade-project-version-modal"
      showScrollbar={!isSelectingVersion}
    >
      { isSelectingVersion &&
        <p className="bx--modal-content__text">
          Please select the IDF Version you wish your projects to be upgraded to:
        </p>
      }
      { !isSelectingVersion &&
        <p className="bx--modal-content__text">
          The conversion process has been started to upgrade selected Projects to the desired IDF version
        </p>
      }

      { isSelectingVersion &&
        <>
          <Label>Select IDF Version</Label>
          <DropdownV2
            label="Choose IDF version"
            items={versions}
            selectedItem={version}
            onChange={value => setVersion(value.selectedItem)}
            id="select-version-dropdown"
            itemToString={item => item ? item.version : ''}
          />
        </>
      }

      { !isSelectingVersion &&
        <ProjectItemContainer>
          {projects.map(project => (
            <ProjectItem key={project.id}>
              <div>{project.name}</div>
              { !project.error &&
                <StyledInlineLoading success={project.success} />
              }
              { project.error &&
                <ErrorText>{project.error}</ErrorText>
              }

            </ProjectItem>
          ))}
        </ProjectItemContainer>
      }

    </StyledModal>
  );
}

export default UpgradeProjectModal;
