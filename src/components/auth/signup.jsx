import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit({email, password}){
        this.props.signupUser({email, password});
    }

    renderField({ input, label, type, meta: { touched, error, warning } }) {
        return (
            <div>
                <div>
                    <input {...input}   type={type} className="form-control"
                                        placeholder={label}/>
                </div>
                <div className="form-messages text-center">
                    {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-warning">{warning}</span>))}
                </div>
            </div>
        )
    }

    render() {

        const email = value =>
            value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
                'Invalid email address' : undefined;

        const minLength = min => value =>
            value && value.length < min ? `Must be ${min} characters or more` : undefined
        const minLength6 = minLength(6);
        const passwordMatches = (value, allValues) => {
            value == allValues.password ? undefined : 'Passwords must match';
        };
        const required = value => value ? undefined : 'Required';

        const {handleSubmit, inProgress} = this.props;
        // const {email, password, passwordConfirm} = this.props.fields;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        <form className="signin" onSubmit={handleSubmit(this.handleFormSubmit )}>
                            <fieldset className="form-group">
                                <Field name="email" label="Email:"
                                       component={this.renderField} type="email"
                                       validate={[ email, required, minLength6 ]}/>
                                {/*{email.touched && email.error && <div className="error">{email.error}</div>}*/}
                            </fieldset>
                            <fieldset className="form-group">
                                <Field name="password" label="Password:"
                                       component={this.renderField} type="password"
                                       className="form-control"
                                       validate={[ required, minLength6 ]}/>
                                {/*{password.touched && password.error && <div className="error">{password.error}</div>}*/}
                            </fieldset>
                            <fieldset className="form-group">
                                <Field name="passwordConfirm" label="Confirm Password:"
                                       component={this.renderField} type="password"
                                       className="form-control"
                                       validate={[ required, minLength6, passwordMatches ]}/>
                                {/*{passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}*/}
                            </fieldset>
                            {this.renderAlert()}
                            <button className="btn btn-block btn-large btn-primary-outline" id='btn-signup' action="submit">
                                {inProgress ?
                                    <span className="pulsate">SIGNING UP</span>
                                    :
                                    <span>SIGN UP</span>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    renderAlert(){
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
}

Signup.propTypes = {};
Signup.defaultProps = {};

function mapStateToProps(state){
    return {
        errorMessage: state.auth.error,
        inProgress: state.auth.submitting
    };
}

const formOptions = {
    form: 'signup',
    // fields: ['email', 'password', 'passwordConfirm'],
    validate
}

function validate(formProps){
    const errors = {};
    if (!formProps.email)           { errors.email = 'Enter an email' };
    if (!formProps.password)        { errors.password = 'Enter a password' };
    if (!formProps.passwordConfirm) { errors.passwordConfirm = 'Enter a password' };
    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }
    return errors;
}

var myForm = reduxForm(formOptions)(Signup);
var myConnectedForm = connect(mapStateToProps, actions)(myForm);
export default myConnectedForm;

// export default reduxForm( formOptions, mapStateToProps, actions )(Signup);

