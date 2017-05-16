import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from '../../components/background';
import Song from '../../components/song';
import styles from './style.scss';

class App extends Component {

    render() {
        return (
            <div className={styles.app}>
                <Background />
                <Song />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentTrack: state.currentTrack
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);