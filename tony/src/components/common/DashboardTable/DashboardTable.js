import React from 'react';
import ProjectDataTable from './ProjectDataTable';
import Pagination from '../Pagination';

const ProjectTable = props => {
  return (
    <div>
      <ProjectDataTable {...props} />
      <Pagination allowSelectPerPage={true} {...props} />
    </div>
  )
}

export default ProjectTable;
