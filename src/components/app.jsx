import React, { Component } from 'react';
import Header from './header'

export default class App extends Component {
    render() {

        return (
            <div>
                <Header/>
                <img src="paper1" alt=""/>
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
