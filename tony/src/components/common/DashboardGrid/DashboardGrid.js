import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';

import DateGroup from './DateGroup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DashboardGrid = ({
  items,
  selectedIds,
  ...props
}) => {
  const dateGroups = _.groupBy(items, project => {
    const date = moment(project.updated_at).format('DD MMM YYYY');
    return date;
  });

  const isItemSelected = projectId => selectedIds && selectedIds.indexOf(projectId) !== -1;

  return (
    <Container>
      {_.map(dateGroups, (items, key) => (
        <DateGroup
          key={key}
          items={items}
          dateString={key}
          isItemSelected={isItemSelected}
          {...props}
        />
      ))}
    </Container>
  );
}

export default DashboardGrid;
