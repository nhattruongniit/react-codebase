import { combineReducers } from 'redux';
import classList from './classList';
import projectId from './projectId';
import classItem from './classItem';
import idfObjects from './idfObjects';
import references from './references';
import importObjects from './importObjects';
import controlSize from './controlSize';

export default combineReducers({
  projectId,
  classList,
  classItem,
  idfObjects,
  importObjects,
  references,
  controlSize,
});
