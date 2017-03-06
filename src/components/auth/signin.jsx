import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit({email, password}){
        this.props.signinUser({email, password});
    }

    render() {

        const {handleSubmit, pristine, inProgress} = this.props;
        //const {email, password} = this.props.fields;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-offset-3 col-xs-6">
                        <form className="signin" onSubmit={handleSubmit(this.handleFormSubmit)}>

                            <fieldset className="form-group">
                                <Field name="email" placeholder="Email:"
                                       component="input" type="email"
                                       className="form-control"/>
                            </fieldset>

                            <fieldset className="form-group">
                                <Field name="password" placeholder="Password:"
                                       component="input" type="password"
                                       className="form-control"/>
                            </fieldset>

                            {this.renderAlert()}

                            <div className="text-center">
                                <button className="btn btn-large btn-block btn-primary-outline"
                                        id="btn-signin"
                                        action="submit"
                                        disabled={pristine}>
                                    {inProgress ?
                                        <span className="pulsate">SIGNING IN</span>
                                        :
                                        <span>SIGN IN</span>}
                                </button>
                            </div>

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

Signin.propTypes = {};
Signin.defaultProps = {};

function mapStateToProps(state){
    return {
        errorMessage: state.auth.error,
        inProgress: state.auth.submitting
    };
}

const configObj = {
    form: 'signin'
    // fields: ['email','password']
}

// export default reduxForm( formOptions, mapStateToProps, actions )(Signin);

var myForm = reduxForm(configObj)(Signin);
var myConnectedForm = connect(mapStateToProps, actions)(myForm);
export default myConnectedForm;
