import request from '../../../services/request';

export const fetchFileSimulation = simulation_id => {
  return request.get(
    `/simulations/${simulation_id}/files`, 
    { 
      showSpinner: true 
    }
  );
}

export const fetchSingleFile = (simulation_id, file_name) => {
  return request.get(
    `/simulations/${simulation_id}/files/${file_name}`, 
    { 
      showSpinner: true 
    }
  );
}

export const deleteMultipleSimulations = ids => {
  return request.delete('/charts/multiple', {
    data: {
      ids
    },
    showSpinner: true
  });
}

export const fetchSimulations = (documentId, current_page, per_page) => {
  return request.get(
    `/idf-documents/${documentId}/simulations?page=${current_page}&per_page=${per_page}`, 
    { 
      showSpinner: true 
    }
  );
};

export const createSimulation = (simulation_name, document_id, status) => {
  const bodyData = {
    simulation_name,
    document_id,
    status
  }
  return request.post(
    `/simulations`,
    bodyData,
    { showSpinner: true }
  )
}

export const updateSimulation = (simulation_id, data) => {
  return request.put(`/simulations/${simulation_id}`, data, { showSpinner: true });
};

export const getLogSimulation = (simulation_id, page, per_page) => {
  return request.get(`/simulations/${simulation_id}/logs?page=${page}&per_page=${per_page}`, { showSpinner: true })
}
