import { connect } from 'react-redux';
import VariablesPanel from '../components/VariablesPanel';
import {
  setVariablesFilter,
  toggleSelectVariable,
  removeVariablesFilter
} from '../reducers/variables';
import { showModal } from '../reducers/addVariables';
import { showRemoveSimulationResultsModal } from '../reducers/removeSimulationResults';
import _ from 'lodash';

function filterVariables(variablesById, variableIds, filters) {
  const filteredVariables = variableIds
    .map(id => variablesById[id])
    .filter(variable => {
      let match = true;
      Object.keys(filters).map(filterName => {
        const filterValue = filters[filterName];
        if (
          filterName === 'step' &&
          variable.type.toLowerCase() !== filterValue.toLowerCase()
        ) {
          match = false;
        }
        if (
          filterName === 'units' &&
          variable.units.toLowerCase() !== filterValue.toLowerCase()
        ) {
          match = false;
        }
        if (
          filterName === 'keyword' &&
          variable.full_name
            .toLowerCase()
            .indexOf(filterValue.toLowerCase()) === -1
        ) {
          match = false;
        }
      });
      return match;
    });
  return filteredVariables;
}

const mapStateToProps = state => {
  const {
    filters,
    selectedVariables,
    variablesBySimulations,
    variablesById,
    units,
  } = state.chartEditor.variables;

  const filteredVariables = Object.values(variablesBySimulations)
    .map(item => {
      return {
        ...item,
        variables: filterVariables(variablesById, item.variableIds, filters)
      };
    })
    .sort((group1, group2) => group1.order - group2.order);

  return {
    variablesBySimulations: filteredVariables,
    filters,
    selectedVariables,
    units
  };
};

const mapDispatchToProps = {
  setFilter: setVariablesFilter,
  removeFilter: removeVariablesFilter,
  toggleVariable: toggleSelectVariable,
  showAddVariablesModal: showModal,
  showRemoveSimulationResultsModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariablesPanel);
