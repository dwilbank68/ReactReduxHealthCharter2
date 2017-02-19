import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
// import { bindActionCreators } from 'redux';

class Header extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         'whatever':{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }

    render() {
        return (
            <header className="main-header">
                <div >
                    <Link to="/" className="navbar-brand"></Link>
                </div>

                <ul className="main-nav">
                    {this.renderLinks()}
                </ul>
            </header>
        );
    }

    renderLinks(){
        if (this.props.authenticated) {
            return [
                <li className="user-info" key="1">
                    {this.props.email}
                </li>,
                <li key="2" className="sign-out">
                    <Link to="signout" className="sign-out-link">Sign Out</Link>
                </li>
            ]
        } else {
            return [
                <li key="signin">
                    <Link to="signin" className="sign-in-link">Sign In</Link>
                </li>,
                <li key="signup">
                    <Link to="signup" className="sign-up-link">Sign Up</Link>
                </li>
            ]

        }

    }
}

Header.propTypes = {};
Header.defaultProps = {};

//function mapDispatchToProps(dispatch) {
//  return bindActionCreators(
//        { nameYouWantOnProps:nameOfImportedAction },
//        dispatch
//  );
//}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        email: state.auth.user.email
    };
}

export default connect(mapStateToProps)(Header);
