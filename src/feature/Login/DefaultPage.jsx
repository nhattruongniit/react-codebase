import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';

/* === import material ui === */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

/* === import libs === */
import lblSession from 'libs/lbl-session';

/* === import component === */
import Loading from 'component/Loading';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    componentWillMount() {
        const token = lblSession.getSession('token');
        console.log('login', token)
        if(token) this.props.history.push('/');
    }

    handleLogin = (e) => {
        e.preventDefault();
        // let data = {
        //     "email": "peter@klaven",
        //     "password": "cityslicka"
        // }
        // this.props.actions.Login(data).then(res => {
        //     lblSession.setSession('token', res.token);
        //     this.props.history.push('/');
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        lblSession.setSession('token', '123');
        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props; 

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form} onSubmit={this.handleLogin}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
                        </form>
                        <div className={classes.submit}>
                            Already a member? <Link to="/register">Register</Link>.
                        </div>
                    </Paper>
                </main>
                <Loading showLoading={this.props.login.showLoading} />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch)
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Login));
  