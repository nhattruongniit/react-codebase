import request from '../../../services/request';

export const createView = (viewName, projectId) => {
  return request.post(
    '/views',
    { view_name: viewName, project_id: projectId },
    { showSpinner: true }
  );
};

export const updateView = (viewId, data) => {
  return request.put(`/views/${viewId}`, data, { showSpinner: true });
};

export const deleteViews = ids => {
  return request.delete('/views/multiple', {
    data: {
      ids
    },
    showSpinner: true
  });
};

export const getViewById = viewId => {
  return request(`/projects/${viewId}`, { showSpinner: true });
};

export const getAllViewsByProjectId = (projectId, currentPage, perPage) => {
  return request(`/projects/${projectId}/views?page=${currentPage}&per_page=${perPage}`, {
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

export const getSimulatorsByDocumentId = (id, pageNumber = 1, perPage = 9999) => {
  return request(`/idf-documents/${id}/simulations`, {
    params: {
      per_page: perPage,
      page: pageNumber
    },
    showSpinner: true
  });
};

export const getChartsBySimulatorId = (id, pageNumber = 1, perPage = 9999) => {
  return request(`/simulations/${id}/charts`, {
    params: {
      per_page: perPage,
      page: pageNumber
    },
    showSpinner: true
  });
};

export const addChartsToView = (viewId, chartsId) => {
  return request.post(
    `/views/${viewId}/add-chart`,
    {
      chart_ids: chartsId
    },
    { showSpinner: true }
  );
};

export const getAllViews = () => {
  return request.get('/views', { showSpinner: true })
}

export const duplicateView = view_id => {
  return request.post(`/views/${view_id}/duplicate`, 
    null,
    { showSpinner: true }
  )
}