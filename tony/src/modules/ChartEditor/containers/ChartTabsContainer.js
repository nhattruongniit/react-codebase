import React from 'react';
import { connect } from 'react-redux';
import ChartTabsContainer from '../components/ChartTabsContainer';
import { addTab, closeTab, switchTab, setTabOption } from '../reducers/tabs';
import Chart from './Chart';

const mapStateToProps = state => {
  const { tabById, activeTabId, tabArray } = state.chartEditor.tabs;

  return {
    tabs: tabArray.map(id => tabById[id]),
    activeTabId: activeTabId
  };
};

const mapDispatchToProps = {
  addTab,
  closeTab,
  setActiveTab: switchTab,
  setTabOption
};

const Container = props => (
  <ChartTabsContainer {...props}>
    <Chart />
  </ChartTabsContainer>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
