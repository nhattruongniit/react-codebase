import { cloneDeep } from 'lodash';

const grid = 12;

export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'rbg(217, 252, 255)' : '#e9ecef',
  padding: grid,
  width: 500,
  minHeight: 200,
  borderRadius: 4,
  border: 1,
  borderStyle: 'solid',
  borderColor: '#ced4da',
});

export const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid,
  margin: `0 0 ${grid}px 0`,
  border: 1,
  borderStyle: 'solid',
  borderColor: '#ced4da',
  borderRadius: 4,
  color: isDragging ? '#fff' : 'rgba(0, 0, 0, 0.87)',

  // change background colour if dragging
  background: isDragging ? '#2196f3' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const isPool = ({ droppableId }) => droppableId === 'pool';

const notId = id => item => item.id !== id;

const removeKycInput = ({ droppableId }) => inputId => (kyc) => {
  if (droppableId !== String(kyc.id)) {
    return kyc;
  }
  const replaced = kyc.config.filter(notId(inputId));
  return {
    ...kyc,
    config: replaced,
  };
};

const removeSource = (source, removed, droppableSource) => {
  if (isPool(droppableSource)) {
    const newSource = source.config.filter(notId(removed.id));
    return {
      type: 'pool',
      config: newSource,
    };
  }
  const newSource = source.map(removeKycInput(droppableSource)(removed.id));
  return {
    config: newSource,
  };
};

const addKycInput = ({ droppableId, index }) => added => (kyc) => {
  if (droppableId !== String(kyc.id)) {
    return kyc;
  }
  kyc.config.splice(index, 0, added);
  return kyc;
};

const addDestination = (destination, added, droppableDestination) => {
  if (droppableDestination.droppableId === 'pool') {
    destination.config.splice(droppableDestination.index, 0, added);
    return {
      type: 'pool',
      config: destination,
    };
  }

  const newDestination = destination.map(addKycInput(droppableDestination)(added));
  return {
    config: newDestination,
  };
};

const identifySelectedInput = (source, droppableSource) => {
  if (isPool(droppableSource)) {
    const [selected] = source.config.splice(droppableSource.index, 1);
    return selected;
  }
  const selectedKyc = source.find(({ id }) => String(id) === droppableSource.droppableId);
  const [selected] = selectedKyc.config.splice(droppableSource.index, 1);
  return selected;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (pool, kyc, droppableSource, droppableDestination) => {
  const { source, destination } = isPool(droppableSource)
    ? {
      source: cloneDeep(pool),
      destination: cloneDeep(kyc),
    } : isPool(droppableDestination)
      ? {
        source: cloneDeep(kyc),
        destination: cloneDeep(pool),
      } : {
        source: cloneDeep(kyc),
        destination: cloneDeep(kyc),
      };

  const selected = identifySelectedInput(cloneDeep(source), droppableSource);
  const newSource = removeSource(cloneDeep(source), selected, droppableSource);
  const newDestination = addDestination(cloneDeep(destination), selected, droppableDestination);

  return {
    newSource,
    newDestination,
  };
};

export const replaceByKycId = kycId => replaced => kyc => ((String(kyc.id) === kycId)
  ? {
    ...kyc,
    config: replaced,
  }
  : kyc
);
