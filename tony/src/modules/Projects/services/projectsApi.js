import _ from 'lodash';
import request from '../../../services/request';

export const createProject = (projectName, versionId) => {
  return request.post(
    '/projects',
    {
      project_name: projectName,
      version_id: versionId
    },
    {
      showSpinner: true
    }
  );
};

export const updateProject = (projectId, data) => {
  return request.put(`/projects/${projectId}`, data, {
    showSpinner: true
  });
};

export const deleteProjects = ids => {
  return request.delete('/projects/multiple', {
    data: {
      project_ids: ids
    },
    showSpinner: true
  });
};

export const getProjectById = projectId => {
  return request(`/projects/${projectId}`, { showSpinner: true });
};

export const updateDocument = (documentId, data) => {
  return request.put(`/idf-documents/${documentId}`, data, {
    showSpinner: true
  });
};

export const createProjectFromFiles = files => {
  var data = new FormData();
  files.forEach(file => {
    data.append('inp-file[]', file);
  });
  return request.post('/projects/import', data, { showSpinner: true });
};

export const fetchDocuments = (projectId, current_page, per_page) => {
  return request(`/projects/${projectId}/idf-documents`, {
    params: {
      page: current_page,
      per_page
    },
    showSpinner: true
  });
};

export const fetchProjects = (current_page, per_page, sortDirection, keyword) => {
  let options = {
    order_by: `updated_at:${sortDirection}`,
    page: current_page,
    per_page
  };

  if (keyword) {
    options = {
      ...options,
      q: keyword,
    }
  }
  return request('/projects', {
    params: options,
    showSpinner: true
  })
};

export const upgradeProject = (projectId, version) => {
  return request(`/projects/${projectId}/convert/${version}`, {
    showSpinner: true
  });
};

export const createDocument = (document_name, project_id, version_id) => {
  return request.post(
    `/idf-documents`,
    {
      document_name,
      project_id,
      version_id
    },
    { showSpinner: true }
  );
};

export const createDocumentFromFile = (projectId, files) => {
  var data = new FormData();
  files.forEach(file => {
    data.append('inp-file[]', file);
  });
  data.append('project-id', projectId);
  return request.post('/projects/import', data, { showSpinner: true });
};

export const deleteDocument = documentId => {
  return request.delete(`/idf-documents/${documentId}`, { showSpinner: true });
};

export const cloneDocuments = documentIds => {
  return request.post(
    `/idf-documents/clone`,
    {
      document_ids: documentIds
    },
    { showSpinner: true }
  );
};

export const cloneProject = projectId => {
  return request.post(`/projects/${projectId}/clone`, null, {
    showSpinner: true
  });
};

export const upgradeDocuments = (
  documentIds,
  versionId,
  projectName,
  targetProjectId
) => {
  const payload = _.pickBy(
    {
      document_ids: documentIds,
      to_version: versionId,
      project_name: projectName,
      project_id: targetProjectId
    },
    _.identity
  );
  return request.post(`/idf-documents/convert`, payload, { showSpinner: true });
};
