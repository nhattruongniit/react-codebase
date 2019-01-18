import React from 'react';
import { CircleLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.scss';

class Loading extends React.Component {
  static propTypes = {
    status: PropTypes.bool.isRequired,
  }

  render() {
    const { status } = this.props;

    return (
      <div>
        {status
          && (
          <div className="sweet-loading">
            <CircleLoader
              color="#D0021B"
              size={100}
              height={150}
              loading={status}
            />
          </div>
          )
        }
      </div>
    );
  }
}

const mapStoreToProps = ({ loadingModal }) => {
  const { status } = loadingModal;
  return {
    status,
  };
};

export default connect(mapStoreToProps)(Loading);
