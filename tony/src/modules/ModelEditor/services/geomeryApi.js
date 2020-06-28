import request from 'services/request';

export function fetchGeometries(documentId) {
  return request(`/idf-documents/${documentId}/geometries`);
}

export function createGeometries(documentId, objects) {
  return request.post(`/idf-documents/${documentId}/geometries`, {
    objects
  });
}

export function deleteGeometries(documentId, ids) {
  return request.delete(`/idf-documents/${documentId}/geometries`, {
    data: {
      ids
    }
  });
}

export function updateGeometries(documentId, objects) {
  return request.put(`/idf-documents/${documentId}/geometries`, {
    ...objects
  });
}
