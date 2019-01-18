import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadingAction } from 'feature';
import { Grid, Row } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import * as CreateKycActions from './redux/action';
import { getKycConfig, postKyc } from './api';
import KycFormRender from './component/KycFormRender';
import './style.scss';

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const byId = id => item => item.id === id;

class CreateKyc extends Component {
  async componentDidMount() {
    const { loadingAction, storeSetKyc, match: { params: { kycId } } } = this.props;
    const forms = await loadingAction(() => getKycConfig({ kycId }));
    storeSetKyc(forms);
  }

  handleSubmitKyc = async (form) => {
    try {
      const { loading, activeStep, match: { params: { kycId } } } = this.props;
      await loading(() => postKyc({
        payload: {
          form,
        },
        formId: activeStep,
        customerId: '5bd833edc092c1034ce6c81a',
        kycId }));
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentKyc = () => {
    const {
      activeStep, forms,
    } = this.props;

    return forms.find(byId(activeStep));
  }

  render() {
    const {
      activeStep, forms, classes,
    } = this.props;

    const currentKycForm = this.getCurrentKyc() || { schema: [] };

    return (
      <div className="create-kyc-container">
        <Grid fluid>
          <Row className="show-grid create-kyc-header">
            <div className={classes.root}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {forms.map(({ id, label }) => (
                  <Step key={id}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <KycFormRender onSubmit={this.handleSubmitKyc} config={currentKycForm.schema} />
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}

CreateKyc.propTypes = {
  storeSetKyc: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  forms: PropTypes.array.isRequired,
};

const mapStateToProps = ({ kyc: { forms, activeStep } }) => ({
  forms,
  activeStep,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadingAction,
    ...CreateKycActions,
  }, dispatch)
);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateKyc));
