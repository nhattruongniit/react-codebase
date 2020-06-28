import styled, { css } from 'styled-components';

const FileInputButton = styled.input`
  border-radius: ${props => props.borderRadius || "5px"};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  min-width: ${props => props.minWidth || '84px'};
  cursor: pointer;
  border: ${props => props.border || 'none'};
  padding: ${props => props.padding || '8px 20px'};

  ${props => props.gradient && css`
    background-image: linear-gradient(53deg, #3598FE 0%, #0763E0 100%);
  `}

  ${props => props.backgroundColor && css`
    background-color: ${props => props.backgroundColor};
  `}

  color: ${props => props.textColor || 'white'};
`;

export default FileInputButton;
