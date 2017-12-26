import React, { Component } from 'react';
import {PropTypes} from 'prop-types';


import './styles.scss';

export default class App extends Component {
    render() {
        const { isMobile } = this.props;

        return (
        <div>
            <h1 className='title'>hello world and {isMobile ? 'mobile' : 'desktop'}</h1>
        </div>
        );
    }
}

App.propTypes = {
    isMobile: PropTypes.bool.isRequired
};