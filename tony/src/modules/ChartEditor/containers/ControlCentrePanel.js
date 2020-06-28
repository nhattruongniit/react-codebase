import { connect } from 'react-redux';
import ControlCentrePanel from '../components/ControlCentrePanel';
import {
  togglePlottedVariable, setPlottedType
} from '../reducers/plottedVariables';
import { setValue, submitForm, clearForm } from '../reducers/chartForm';
import { setSectionLength, setActiveSection, setSectionDateTime } from '../reducers/plottedVariableSections';

const mapStateToProps = state => {

  const { variables, selectedVariables, plottedType } = state.chartEditor.plottedVariables;
  const { values, isSubmitting, error  } = state.chartEditor.chartForm;
  const { sections, activeSectionId } = state.chartEditor.plottedVariableSections;

  let variableGroups = [];

  if (plottedType === 'single') {
    Object.keys(selectedVariables).forEach(variableId => {
      const variable = variables.find(variable => variable.id.toString() === variableId);
      if (variable) {
        const group = variableGroups.find(group => group.simulationId === variable.simulation_id);
        if (!group) {
          variableGroups.push({
            simulationName: variable.simulationName,
            simulationId: variable.simulationId,
            variables: [variable]
          });
        } else {
          group.variables.push(variable);
        }
      }
    });
  } else {
    variableGroups = sections.map(section => {
      const variableArray = section.variableIds.map(variableId => {
        const variable = variables.find(variable => variable.id === variableId);
        return variable;
      }).filter(variable => !!variable);
      return {
        ...section,
        variables: variableArray,
      };
    });
    console.log(variableGroups);
  }


  return {
    variableGroups,
    selectedVariables: state.chartEditor.plottedVariables.selectedVariables,
    formValues: values,
    isSubmitting,
    error,
    chart: state.chartEditor.chart,
    sectionLength: state.chartEditor.plottedVariableSections.sections.length,
    activeSectionId,
    plottedType,
  };
};

const mapDispatchToProps = {
  toggleSelected: togglePlottedVariable,
  setValue,
  submitForm,
  clearForm,
  setSectionLength,
  setActiveSection,
  setPlottedType,
  setSectionDateTime
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlCentrePanel);