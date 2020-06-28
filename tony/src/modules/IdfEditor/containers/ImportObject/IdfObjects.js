import { connect } from 'react-redux';
import IdfObjects from '../../components/ImportObject/IdfObjects';

const mapStateToProps = state => {
  const { pageNumber, objects, itemsPerPage, fieldname } = state.importObjects;  
  const start = (pageNumber - 1) * itemsPerPage;

  return {   
    objects,
    fields: fieldname.length > 0 ? state.classItem.fields.filter(el => el.field_name.toLowerCase().includes(fieldname)) : state.classItem.fields,
    orderOffset: start,
  };
}
export default connect(mapStateToProps)(IdfObjects);


