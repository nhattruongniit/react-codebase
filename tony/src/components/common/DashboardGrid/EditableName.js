import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1em;
  line-height: 1.29;
  text-align: left;
  color: #152935;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NameEditInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 1em;
`;

class EditableName extends React.Component {
  state = {
    isEditingName: false,
  }

  componentDidMount() {
    this.nameEditInputRef = React.createRef();
  }

  setIsEditingName = (isEditingName) => this.setState({ isEditingName });

  editName = () => {
    this.setIsEditingName(true);
    setTimeout(() => {
      this.nameEditInputRef.current.focus();
      this.nameEditInputRef.current.setSelectionRange(0, this.nameEditInputRef.current.value.length)
    }, 50);
  }

  saveChanges = (value) => {
    const { onNameChange } = this.props;
    if (value.length > 0) {
      this.setIsEditingName(false);
      onNameChange(value);
    }
  }

  render() {
    const { name } = this.props;
    const { isEditingName } = this.state;
    return (
      <Container>
        {!isEditingName && name}
        <NameEditInput
          style={{ display: isEditingName ? 'block' : 'none' }}
          ref={this.nameEditInputRef}
          defaultValue={name}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.saveChanges(e.target.value);
            }
          }}
        />
      </Container>
    );
  }
}

export default EditableName;
