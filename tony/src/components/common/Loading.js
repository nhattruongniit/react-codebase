import React from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Loading } from 'carbon-components-react';

const Wrapper = styled.div`
  z-index: 9999;
  .bx--loading-overlay {
    z-index: 9999;
  }
`;

const CustomLoading = () => (
  <Portal>
    <Wrapper>
      <Loading />
    </Wrapper>
  </Portal>
);

export default CustomLoading;
