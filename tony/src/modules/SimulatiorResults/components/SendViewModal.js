import React, { Fragment, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Portal } from 'react-portal';
import { Modal, Select, SelectItem } from 'carbon-components-react';

const StyledModal = styled(Modal)`
  .bx--modal-header {
    margin-bottom: 0;
  }
  .bx--modal-content {
    overflow-y: hidden
  }
  .bx--modal-container {
    min-width: 650px;
  }
`;

const StyledOption = styled.div`
  p {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }
`

const StyledContent = styled.div`
`

const StyledInfo = styled.div`
  margin-top: 20px;
  .bx--select {
    width: 200px;
  }
  p {
    font-siize: 13px;
  }
`

const StyledNormal = styled.div`
  font-size: 15px;
  margin-top: 25px;
`

const StyledNumber = styled.b`
  font-weight: bold;
  display: inline-block;
  margin-left: 10px;
  ${props => props.error && css`
    color: #f00;
  `}
`

const ErrorLimitStyled = styled.p`
  color: #f00;
  font-size: 14px;
`

const SendViewModal = ({ 
  isShowing, 
  views, 
  amountChartInView, 
  chartIds, 
  selectedSimulatorsId, 
  cancelFn, 
  getAllChartsByViewFn, 
  addChartToViewFn,
}) => {
  const [errorLimit, setErrorLimit] = useState(false);
  const [errorChooseView, setErrorChooseView] = useState(false);
  const [hasView, setHasView] = useState(false);
  const [viewId, setViewId] = useState(null);
  const amountCharts = chartIds.length || selectedSimulatorsId.length;

  const handleSubmit = () => {
    const totalCharts = amountCharts + amountChartInView;
    const arrayCharts = chartIds.length > 0 ? chartIds : selectedSimulatorsId;
    if(!hasView) {
      setErrorChooseView(true);
      return false
    }
    setErrorChooseView(false);
    if(totalCharts > 12 ) {
      setErrorLimit(true);
      return false;
    } 
    setErrorLimit(false);
    addChartToViewFn(viewId, arrayCharts)
  }

  const handleCancel = () => {
    setErrorLimit(false);
    setErrorChooseView(false);
    cancelFn();
  }

  const onChangeSelect = (viewId) => {
    setHasView(true);
    setViewId(viewId);
    setErrorChooseView(false);
    getAllChartsByViewFn(viewId)
  }

  return (
    <Portal>
      <StyledModal
        open={isShowing}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        modalHeading="Add charts to the View"
        onRequestClose={handleCancel}
        onRequestSubmit={handleSubmit}
      >
        <StyledOption>
          <StyledContent>
            {errorLimit && 
              <ErrorLimitStyled>
                Number of chart currently in the view is 12. You can't add more another chart. <br/> Please choose another view.
              </ErrorLimitStyled>
            }
            {errorChooseView && 
              <ErrorLimitStyled>
                Please choose View Title
              </ErrorLimitStyled>
            }
            <StyledNormal>Please select View you want to send charts to:</StyledNormal>
            <StyledInfo>
              <p>View Title</p>
              <Select 
                hideLabel
                defaultValue="placeholder"
                onChange={e => onChangeSelect(e.target.value)}
              >
                <SelectItem disabled value="placeholder" text="Choose View" />
                {views.length > 0 && views.map(view => {
                  return (
                    <Fragment key={view.id}>
                      <SelectItem value={view.id} text={view.view_name} />
                    </Fragment>
                  )
                })}
              </Select>
            </StyledInfo>
            <StyledNormal>Number of chart currently in the View: <StyledNumber error={amountChartInView === 12}>{amountChartInView}</StyledNumber></StyledNormal>
            <StyledNormal>Number of selected Charts: <StyledNumber>{amountCharts}</StyledNumber></StyledNormal>
          </StyledContent>
        </StyledOption>
      </StyledModal>
    </Portal>
  )
};

export default SendViewModal;
