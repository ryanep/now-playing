import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './style.scss';

export default class Song extends Component {

    render() {
        return (
            <div className={styles.song}>
                Song
            </div>
        )
    }

}