import request from '../../../services/request';

export const fetchClassList = (documentId) => {
  return request(`/idf-documents/${documentId}/classes`, {
    showSpinner: true,
  });
}

export const fetchObjectCount = documentId => {
  return request(`/idf-documents/${documentId}/stats/object-count`, {
    showSpinner: true,
  });
}

export const fetchClassData = (documentId, className) => {
  return request(`/idf-documents/${documentId}/classes/${className}`, {
    showSpinner: true,
  });
}

export const fetctIdfObjectList = (documentId, className, pageNumber, itemsPerPage) => {
  return request(`/idf-documents/${documentId}/classes/${className}/objects`, {
    params: {
      page: pageNumber,
      per_page: itemsPerPage,
    },
  }, {
    showSpinner: true,
  });
}

export const fetctIdfObjectListByCategory = (documentId, className, categoryId, pageNumber, itemsPerPage) => {
  return request(`/idf-documents/${documentId}/classes/${className}/objects`, {
    params: {
      category: categoryId,
      page: pageNumber,
      per_page: itemsPerPage,
    },
  });
}

export const fetchIdfObjectDetails = (documentId, className, objectId) => {
  return request(`/idf-documents/${documentId}/classes/${className}/objects/${objectId}`);
}

export const createIdfObject = (documentId, className, idfObject) => {
  return request.post(`/idf-documents/${documentId}/classes/${className}/objects`, idfObject);
}

export const updateIdfObject = (documentId, className, objectId, idfObject) => {
  return request.put(`/idf-documents/${documentId}/classes/${className}/objects/${objectId}`, idfObject);
}

export const deleteIdfObject = (documentId, className, idfObjectId) => {
  return request.delete(`/idf-documents/${documentId}/classes/${className}/objects/${idfObjectId}`);
}

export const getObjectsByClassList = (documentId, listClassName) => {
  return request.post(`/idf-documents/${documentId}/get-objects-by-class-list`, {
    class_names: listClassName
  });
}

export const addObjects = (documentId, data) => {
  return request.post(`/idf-documents/${documentId}/get-objects-by-class-list`, data);
}

export const fetchReference = (documentId, referenceName) => {
  return request(`/idf-documents/${documentId}/references/${referenceName}`);
}