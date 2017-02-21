import React, { Component } from 'react';
import Header from './header'

import paper1 from '../../assets/paper-background-1.jpg';

export default class App extends Component {
    render() {
        console.log('------------------------------------------');
        console.log('paper1 ',paper1);
        console.log('------------------------------------------');
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
