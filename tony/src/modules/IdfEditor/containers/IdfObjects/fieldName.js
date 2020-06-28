import { connect } from 'react-redux';
import FieldName from '../../components/IdfObjects/fieldName';

const mapStateToProps = state => {
  return {
    fields: state.classItem.fields
  };
};

export default connect(mapStateToProps)(FieldName);
