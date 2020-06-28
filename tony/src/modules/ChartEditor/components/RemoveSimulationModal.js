import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Checkbox } from 'carbon-components-react';
import { Portal } from 'react-portal';

const Instruction = styled.div`
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const AddVariablesModal = ({ closeModal, removeSimulationResults, simulations }) => {
  const simulationIds = simulations.map(simulation => simulation.id);
  const [selectedSimulationIds, setSelectedSimulationIds] = useState(
    simulationIds
  );

  function toggleSelectedSimulation(simulationId) {
    const index = selectedSimulationIds.indexOf(simulationId);
    if (index === -1) {
      selectedSimulationIds.push(simulationId);
    } else {
      selectedSimulationIds.splice(index, 1);
    }
    setSelectedSimulationIds([...selectedSimulationIds]);
  }

  function onSubmit() {
    if (selectedSimulationIds.length === 0) return;
    removeSimulationResults(selectedSimulationIds);
  }

  return (
    <Portal>
      <Modal
        open
        modalHeading="Remove Simulation Results"
        primaryButtonText="OK"
        secondaryButtonText="Cancel"
        onRequestClose={closeModal}
        onRequestSubmit={onSubmit}
        danger
      >
        <Instruction>
          Please select simulation results you wish to be removed from the chart:
        </Instruction>

        {simulations.length === 0 &&
          <Instruction>
            <br />
            Please add simulation results first
          </Instruction>
        }

        {simulations.map(simulation => (
          <Checkbox
            id={`selected-simulation-${simulation.id}`}
            key={simulation.id}
            labelText={simulation.name}
            checked={selectedSimulationIds.indexOf(simulation.id) !== -1}
            onClick={() => toggleSelectedSimulation(simulation.id)}
          />
        ))}
      </Modal>
    </Portal>
  );
};

export default AddVariablesModal;
