import React from 'react';
import styled from 'styled-components';

const ObjectCountContainer = styled.div`
  border-radius: 6px;
  background-color: #d9ebfd;  
  height: 13px;
  padding: 2px 7px;
  align-self: flex-start;
  margin-top: 8px;
`;

const ObjectCountNumber = styled.div`
  font-size: 8px;
  font-weight: 600;  
  line-height: 1.25;  
  text-align: center;
  color: #152935;
`;

const ObjectCount = ({ count }) => (
  <ObjectCountContainer>
    <ObjectCountNumber>{count}</ObjectCountNumber>
  </ObjectCountContainer>
);

export default ObjectCount;
