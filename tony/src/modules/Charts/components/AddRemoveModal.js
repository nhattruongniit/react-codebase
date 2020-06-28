import React from 'react';
import { Modal, Checkbox, RadioButtonGroup, FormGroup, RadioButton } from 'carbon-components-react';
import styled from 'styled-components';
import ErrorMessage from 'components/common/ErrorMessage';

// component
import ArrowCollapse from 'components/common/Svg/ArrowCollapse';
import ArrowExpand from 'components/common/Svg/ArrowExpand';

const StyledModal = styled(Modal)`
  z-index: 2 !important;
  .bx--modal-content {
    overflow-y: ${props => props.open ? 'initial' : 'auto'};
    padding: 0 5px;
  }
  .bx--modal-content__text {
    margin-bottom: 15px;
  }
`;

const TreeMenuStyled = styled.div`
  height: 190px;
  overflow-y: scroll;
`

const ListStyled = styled.ul`
  list-style: none;
`

const SubListStyled = styled.li`
  position: relative;
  cursor: pointer;
  border-top: 1px solid #DFE3E6;
  padding: 10px 0;
  font: 16px/24px IBM Plex Sans;
  &:last-child {
    border-bottom: 1px solid #DFE3E6;
  }
  p {
    padding-left: 20px;
  }
  .arrow {
    position: absolute;
  }
  .arrow__expand {
    opacity: 0;
    top: 8px;
  }
  ul {
    display: none;
    li {
      border-top: none;
      padding-left: 24px;
    }
    li:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`

const ToggleMenuStyled = styled.input`
  width: 100%;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 0;
  opacity: 0;
  height: 45px;
  margin: 0;
  &:checked {
    & ~ .arrow__collapse {
      opacity: 0;
    }
    & ~ .arrow__expand {
      opacity: 1;
    }
    & ~ ul {
      display: block;
    }
  }
`

const FormGroupStyled = styled(FormGroup)`
  .bx--radio-button-group {
    display: block;
    margin-top: 0;
  }
  .bx--radio-button__label {
    justify-content: flex-start;
  }
  .bx--radio-button-wrapper + .bx--radio-button-wrapper {
    margin-top: 10px;
  }
`

const CreateChartModal = ({
  error,
  isWorking,
  isShowingResult,
  documents,
  simulators,
  charts,
  selectCharts,
  viewId,
  currentCharts,
  cancelFn,
  getSimsByDocumentFn,
  getChartsBySimFn,
  addChartsToViewFn,
  selectChartFn,
  deleteSelectChartFn
}) => {
  const existedCharts = currentCharts.some(chart => selectCharts.indexOf(chart.id) > - 1);

  const onRequestSubmit = () => {
    if(selectCharts.length === 0) return false;
    if(selectCharts.length > 12) return false;
    if(existedCharts) return false;

    addChartsToViewFn(viewId, selectCharts);
    deleteSelectChartFn();
  }

  const onRequestClose = ()  => {
    if (isWorking) return;
    cancelFn();
    deleteSelectChartFn();
  }

  const onChangeDocument = id => e => {
    const { checked } = e.target;
    const existed = simulators.some(val => val.document_id === id);
    if (checked && !existed) {
      getSimsByDocumentFn(id);
    }
  }

  const onChangeSim = id => e => {
    const { checked } = e.target;
    const existed = charts.some(val => val.parent_simulation_id === id);
    if (checked && !existed) {
      getChartsBySimFn(id);
    }
  }

  const onChangeChart = id => isCheck => {
    const existed = selectCharts.some(chart => chart === id);
    if (isCheck && !existed) {
      selectChartFn(true, id);
    } else {
      selectChartFn(false, id);
    }
  }

  const renderSims = document => {
    const data = simulators.filter(val => val.document_id === document.id);
    return data;
  }

  const renderCharts = sim => {
    const data = charts.filter(val => val.parent_simulation_id === sim.id);
    return data;
  }

  return (
    <StyledModal
      open={isShowingResult}
      modalHeading="Add/Remove simulation results"
      onRequestClose={onRequestClose}
      onRequestSubmit={onRequestSubmit}
      primaryButtonText={isWorking ? 'Please wait...' : 'Ok'}
      secondaryButtonText="Cancel"
      id="create-view-modal"
    >
      <FormGroupStyled legendText=""> 
        <RadioButtonGroup
          defaultSelected="remove"
          name=""
          onChange={e => console.log(e)}
        >
          <RadioButton 
            value="add" 
            id="add" 
            labelText="Add simulation results to selected charts" 
          />
          <RadioButton
            value="remove"
            id="remove"
            labelText="Remove simulation results to selected charts"
          />
        </RadioButtonGroup>
        </FormGroupStyled>
      <p className="bx--modal-content__text">
        Please select IDF Documents and Simulations:
      </p>
      <TreeMenuStyled>
        <ListStyled>
          {documents.length > 0 && documents.map(doc => {
            return (
              <SubListStyled key={doc.id}>
                <ToggleMenuStyled type="checkbox" onChange={onChangeDocument(doc.id)}/>
                <span className="arrow arrow__collapse">
                  <ArrowCollapse />
                </span>
                <span className="arrow arrow__expand">
                  <ArrowExpand/>
                </span>
                <p>{doc.document_name}</p>
                <ul>
                  {simulators.length > 0 && renderSims(doc).map(sim => {
                    return (
                      <SubListStyled key={sim.id}>
                        <ToggleMenuStyled type="checkbox" onChange={onChangeSim(sim.id)}/>
                        <span className="arrow arrow__collapse">
                          <svg width="7" height="12" viewBox="0 0 7 12">
                            <path d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"/>
                          </svg>
                        </span>
                        <span className="arrow arrow__expand">
                          <svg width="12" height="7" viewBox="0 0 12 7">
                            <path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z" />
                          </svg>
                        </span>
                        <p>{sim.simulation_name}</p>
                        <ul>
                          {charts.length > 0 && renderCharts(sim).map(chart => {
                            return (
                              <li key={chart.id}>
                                <Checkbox checked={selectCharts.indexOf(chart.id) !== -1} id={`${chart.id}`.toString()} labelText={chart.chart_name} onChange={onChangeChart(chart.id)} 
                                />
                              </li>
                            )
                          })}
                        </ul>
                      </SubListStyled>
                    )
                  })}
                </ul>
              </SubListStyled>
            )
          })}
        </ListStyled>
      </TreeMenuStyled>
      { error &&
        <ErrorMessage>{error}</ErrorMessage>
      }
    </StyledModal>
  );
}

export default CreateChartModal;
