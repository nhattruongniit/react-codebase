import request from '../../../services/request';

export const fetchSingleView = id => {
  return request(`/views/${id}`);
}

export const createChart = (chart_name, parent_simulation_id, type, options) => {
  const data = {
    chart_name,
    parent_simulation_id,
    type,
    options
  }
  return request.post(
    '/charts',
    data,
    { showSpinner: true }
  );
};

export const updateChart = (chartId, data) => {
  return request.put(`/charts/${chartId}`, data, { showSpinner: true });
};

export const removeChartsFromView = (viewId, chartIds) => {
  return request.post(`/views/${viewId}/remove-chart`, {
    chart_ids: chartIds,
  },
  { showSpinner: true }
  );
};

export const deleteMultipleCharts = ids => {
  return request.delete('/charts/multiple', {
    data: {
      ids
    }   
  },
  { showSpinner: true }
  );
};

export const getChartsByView = id => {
  return request(`/views/${id}/charts`, {
    params: {
      per_page: 99999
    },
    showSpinner: true
  });
};

export const getDocumentsByProjectId = id => {
  return request(`/projects/${id}/idf-documents`, {
    params: {
      per_page: 99999
    },
    showSpinner: true
  });
};

export const getSimulatorsByDocumentId = id => {
  return request(`/idf-documents/${id}/simulations`, {
    params: {
      per_page: 99999
    },
    showSpinner: true
  });
};

export const getChartsBySimulatorId = id => {
  return request(`/simulations/${id}/charts`, {
    params: {
      per_page: 99999
    },
    showSpinner: true
  });
};

export const addChartsToView = (view_id, chart_ids) => {
  return request.post(
    `/views/${view_id}/add-chart`,
    {
      chart_ids
    },
    { showSpinner: true }
  );
};

export const fetchSingleChart = chart_id => {
  return request.get(`/charts/${chart_id}/`, { showSpinner: true });
};

export const cloneChart = chartId => {
  return request.post(`/charts/${chartId}/clone`, null, {
    showSpinner: true
  });
};