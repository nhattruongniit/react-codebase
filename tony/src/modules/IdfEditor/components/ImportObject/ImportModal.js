import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'carbon-components-react';
import IdfObjects from '../../containers/ImportObject/IdfObjects';
import IdfObjectPagination from '../../containers/ImportObject/IdfObjectPagination';
import Group from '../ClassList/Group';
import ClassItem from '../ClassList/ClassItem';

const StyledModal = styled(Modal)`
  overflow: auto;

  @media (min-width: 1024px) {
    & > .bx--modal-container {
      max-width: 90%;
      max-height: inherit !important;
    }
  }

  @media (min-width: 600px) {
    .bx--modal-container {
      max-height: inherit;
    }
  }

  > .bx--modal-container {
    height: auto;
    max-height: inherit;
    margin-top: 100px;
  }
`;

const IdfItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-grow: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: #f3f9ff;
`;

const ContentWrapper = styled.div`
  display: block;
`;

const Container = styled.div`
  height: 460px;
  overflow: hidden;
  display: flex;
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  width: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

class ImportModal extends Component {
  state = {
    isActive: true
  }

  componentDidMount() {
    if (this.props.category) {
      this.props.selectPage(1);
    }
  }

  componentDidUpdate(prevProps) {
    if ((!prevProps.category && this.props.category) || (prevProps.category && this.props.category
      && prevProps.category.id !== this.props.category)) {
      this.props.selectPage(1);
    }
    if (!this.props.category && this.props.categories && this.props.categories.length > 0) {
      this.props.setCategory(this.props.categories[0]);
    }
  }

  toggleGroup = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  selectCategory = (id) => {
    const category = this.props.categories.find(el => el.id === id);
    this.props.setCategory(category);
  }

  render() {
    const { className, open, onClose, addObjects, categories, category } = this.props;
    return (
      <StyledModal
        open={open}
        modalHeading="Import from Library"
        onRequestClose={() => onClose(false)}
        onRequestSubmit={() => addObjects()}
        primaryButtonText="Import"
        secondaryButtonText="Cancel"
        primary
        id="confirm-import-objects-modal"
      >
        <ContentWrapper>
          <Description>
            Selected objects from the Library will be imported into your project.
          </Description>
          <Container>
            <Sidebar>
              {categories && category && (
                <Group
                  name={className}
                  onToggle={this.toggleGroup}
                  isActive={this.state.isActive}
                  groupId={null}
                  objects={1}
                >
                  {categories.map(el => (
                    <ClassItem
                      class_name={el.name}
                      classId={el.id}
                      selectClass={this.selectCategory}
                      key={el.id}
                      isActive={el.id === category.id}
                    />
                  ))}
                </Group>
              )}
            </Sidebar>
            <IdfItemContainer>
              <IdfObjects />
              <IdfObjectPagination />
            </IdfItemContainer>
          </Container>
        </ContentWrapper>
      </StyledModal>
    )
  }
}
export default ImportModal;
