import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './style.scss';

export default class Song extends Component {

    render() {
        return (
            <div className={styles.song}>
                <img src={this.props.artwork} className={styles.artwork} />
                <div className={styles.track}>
                    <h1 className={styles.title}>{this.props.title}</h1>
                    <h2 className={styles.artist}>{this.props.artist}</h2>
                </div>
                {this.props.added &&
                <div className={styles.info}>
                    <img className={styles.photo} src={this.props.added && this.props.added.photo} />
                    <div className={styles.added}>
                        <div className={styles.addedName}>Added by</div>
                        <div className={styles.name}>{this.props.added && this.props.added.name}</div>
                    </div>
                </div>
                }
            </div>
        )
    }

}