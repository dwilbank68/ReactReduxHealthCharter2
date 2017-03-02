import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router';

const welcome = ({loggedIn}) => {
    var title = "HEART HEALTH TRACKER";
    return (
        <div className="welcome container">
            <div className="row">
                <div className="col-xs-6 col-xs-offset-3 text-center ">
                    {
                        loggedIn ?
                        <div className="welcome-title">
                            HEART HEALTH TRACKER
                            <Link to="feature" className="go-to-feature ">
                                &#9758;
                            </Link>
                        </div>
                            :
                        <div className="welcome-title">
                            HEART HEALTH TRACKER
                        </div>
                    }
                </div>


            </div>

            <div className="row middle-row">
                <div className="col-xs-4">
                    <div className="welcome-header">DYNAMIC CHARTS</div>
                    <p>Dual charts make trends and correlations plain to see</p>
                    <p>Hover over a bar to see the stats for that day</p>
                    <p>Click a bar to revisit the entries for that day</p>
                    <p>Track your daily salt and water intake</p>
                    <p>Totals are calculated automatically</p>
                </div>
                <div className="col-xs-4">
                    <div className="welcome-header">RESEARCH FOODS</div>
                    <p>Look up the salt content of over 700,000 foods in the Nutritionix Database</p>
                </div>
                <div className="col-xs-4">
                    <div className="welcome-header">ALT TABLE VIEW</div>
                    <p>Data is also provided in a tabular form for easy cutting-and-pasting</p>
                </div>
            </div>


            <div>
            </div>
            <div>

            </div>
        </div>
    );
};

welcome.propTypes = {};
welcome.defaultProps = {};

function mapStateToProps(state, ownProps) {
   return { loggedIn: state.auth.authenticated }
}

export default connect(mapStateToProps)(welcome);

