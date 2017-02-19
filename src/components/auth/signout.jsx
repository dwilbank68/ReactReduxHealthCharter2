import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

require('../../../style/style.scss');

class Signout extends Component {

    // constructor(props){
    //     super(props);
    //     this.handleFormSubmit = this.handleFormSubmit.bind(this)
    // }

    componentWillMount() {
        this.props.signoutUser();
        // UNAUTH_USER
    }


    render() {
        return (
            <div className="signout container">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        You have been signed out.
                    </div>
                </div>
            </div>
        );
    }

}

Signout.propTypes = {};
Signout.defaultProps = {};

export default connect( null, actions )(Signout);
