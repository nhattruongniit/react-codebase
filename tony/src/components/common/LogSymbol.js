import React, { memo } from 'react';
import styled from 'styled-components';
import ErrorIcon from '@carbon/icons-react/es/error--filled/16';
import WarningIcon from '@carbon/icons-react/es/warning--alt--filled/16';
import InforIcon from '@carbon/icons-react/es/information--filled/16'; 

const VersionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledInfor = styled.div`
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    padding-left: 3px;
    color: #5A6872;
  }
`;

const LogSymbol = memo(({ item }) => {
  const infoTotal = item.info_logs + item.notice_logs + item.error_logs + item.warning_logs + item.success_logs;
  return (
    <VersionBar>
      <StyledInfor>
        <InforIcon fill="#30588C"/>
        <span>{infoTotal}</span>
      </StyledInfor>
      <StyledInfor>
        <WarningIcon fill="#EFC100" />
        <span>{item.warning_logs}</span>
      </StyledInfor>
      <StyledInfor>
        <ErrorIcon fill="#E0182D" />
        <span>{item.error_logs}</span>
      </StyledInfor>
    </VersionBar>
  )
});

export default LogSymbol;