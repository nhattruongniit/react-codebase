import React from 'react';
import { connect } from 'react-redux';
import RemoveSimulationModal from '../components/RemoveSimulationModal';
import {
  closeRemoveSimulationResultsModal,
  removeSimulationResults
} from '../reducers/removeSimulationResults';

const mapStateToProps = state => {
  const { variablesBySimulations, simulationId } = state.chartEditor.variables;
  const simulations = Object.values(variablesBySimulations)
    .filter(simulation => simulation.simulationId !== Number(simulationId))
    .map(simulation => ({
      id: simulation.simulationId,
      name: simulation.simulationName
    }));

  return {
    simulations,
    isShowing: state.chartEditor.removeSimulationResults.isShowingModal
  };
};

const mapDispatchToProps = {
  removeSimulationResults,
  closeModal: closeRemoveSimulationResultsModal
};

const Container = ({ isShowing, ...props }) => {
  if (!isShowing) return <div />
  return <RemoveSimulationModal {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
