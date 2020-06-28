import { connect } from 'react-redux';
import IdfObjects from '../../components/IdfObjects';

const mapStateToProps = state => {
  const { pageNumber, objects, itemsPerPage, fieldname } = state.idfObjects;
  const start = (pageNumber - 1) * itemsPerPage;

  return {
    classItem: state.classItem,
    objects,
    fields:
      fieldname.length > 0
        ? state.classItem.fields.filter(el =>
            el.field_name.toLowerCase().includes(fieldname)
          )
        : state.classItem.fields,
    orderOffset: start,
    isAddNewObject: state.idfObjects.isAddNewObject
  };
};

export default connect(mapStateToProps)(IdfObjects);
