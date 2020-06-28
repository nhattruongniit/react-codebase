import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, DropdownV2, InlineLoading, RadioButton, TextInput } from 'carbon-components-react';
import SuccessIcon from '@carbon/icons-react/es/checkmark/16';
import { Container, Row, Col } from 'react-grid-system';
import { DOCUMENT_UPGRADE_OPTIONS } from '../constants';

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

const StyledRadioButton = styled(RadioButton)`
  .bx--radio-button__label {
    justify-content: flex-start;
  }
`

const DocumentArrayContainer = styled.div`
  margin-top: 20px;
`;

const DocumentItem = styled.div`
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
  isSelectingOptions,
  projects,
  versions,
  documentStatuses,
  upgradeFn,
  cancelFn,
}) => {
  const [upgradeOption, setUpgradeOption] = useState(DOCUMENT_UPGRADE_OPTIONS.CREATE_NEW_PROJECT);
  const [newProjectVersion, setNewProjectVersion] = useState(null);
  const [newProjectName, setNewProjectName] = useState(null);
  const [targetProject, setTargetProject] = useState(null);
  const isUpgradeDone = !isSelectingOptions && !documentStatuses.find(document => document.isUpgrading === true);

  const primaryButtonText = isSelectingOptions ?
    'Upgrade' : 'Minimize';

  const onSubmit = () => {
    if (!isSelectingOptions) {
      return cancelFn();
    }
    const data = {
      projectName: newProjectName,
      version: newProjectVersion,
      targetProjectId: targetProject && targetProject.id,
    }
    return upgradeFn(data);
  }

  return (
    <StyledModal
      open={isShowingModal}
      modalHeading={isSelectingOptions ? 'Upgrade IDF Version' : 'Upgrade selected Projects'}
      onRequestClose={cancelFn}
      onRequestSubmit={onSubmit}
      primaryButtonText={primaryButtonText}
      secondaryButtonText="Cancel"
      id="upgrade-project-version-modal"
      showScrollbar={!isSelectingOptions}
    >
      { isSelectingOptions &&
        <>
          <p className="bx--modal-content__text">
            Please choose the destination for the upgraded IDF documents
          </p>

          <br />

          <Label>Select an option for the upgraded IDF Documents</Label>
          <Row>
            <Col md={6}>
              <StyledRadioButton
                id={DOCUMENT_UPGRADE_OPTIONS.CREATE_NEW_PROJECT}
                value={DOCUMENT_UPGRADE_OPTIONS.CREATE_NEW_PROJECT}
                onChange={() => setUpgradeOption(DOCUMENT_UPGRADE_OPTIONS.CREATE_NEW_PROJECT)}
                labelText="Create new Project"
                name="select-upgrade-option"
                checked={upgradeOption === DOCUMENT_UPGRADE_OPTIONS.CREATE_NEW_PROJECT}
              />
            </Col>
            <Col md={6}>
              <StyledRadioButton
                id={DOCUMENT_UPGRADE_OPTIONS.MOVE_TO_EXISITNG_PROJECT}
                value={DOCUMENT_UPGRADE_OPTIONS.MOVE_TO_EXISITNG_PROJECT}
                onChange={() => setUpgradeOption(DOCUMENT_UPGRADE_OPTIONS.MOVE_TO_EXISITNG_PROJECT)}
                labelText="Move to existing Project"
                name="select-upgrade-option"
                checked={upgradeOption === DOCUMENT_UPGRADE_OPTIONS.MOVE_TO_EXISITNG_PROJECT}
              />
            </Col>
          </Row>

          <br />

          <Row>
            <Col md={6}>
              <Label>Select IDF Version</Label>
              <DropdownV2
                label="Choose IDF version"
                items={versions}
                selectedItem={newProjectVersion}
                onChange={value => setNewProjectVersion(value.selectedItem)}
                id="select-version-dropdown"
                itemToString={item => item ? item.version : ''}
                disabled={upgradeOption !== DOCUMENT_UPGRADE_OPTIONS.CREATE_NEW_PROJECT}
              />
              <br />
              <br />
              <TextInput
                id="new-project-title"
                label="Project Title"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                disabled={upgradeOption !== DOCUMENT_UPGRADE_OPTIONS.CREATE_NEW_PROJECT}
                style={{ minWidth: '100%'}}
              />
            </Col>
            <Col md={6}>
              <Label>Select IDF Version</Label>
              <DropdownV2
                label="Select Project"
                items={projects}
                selectedItem={targetProject}
                onChange={value => setTargetProject(value.selectedItem)}
                id="select-target-project-dropdown"
                itemToString={item => item ? item.project_name : ''}
                disabled={upgradeOption !== DOCUMENT_UPGRADE_OPTIONS.MOVE_TO_EXISITNG_PROJECT}
              />
            </Col>
          </Row>

        </>
      }


      { !isSelectingOptions &&
        <DocumentArrayContainer>
          {documentStatuses.map(document => (
            <DocumentItem key={document.id}>
              <div>{document.name}</div>
              { !document.error &&
                <StyledInlineLoading success={document.success} />
              }
              { document.error &&
                <ErrorText>{document.error}</ErrorText>
              }

            </DocumentItem>
          ))}
        </DocumentArrayContainer>
      }

    </StyledModal>
  );
}

export default UpgradeProjectModal;
