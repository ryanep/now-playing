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
                <Song artist={'Example Artist'} title={'Example Title'} artwork={'https://i.scdn.co/image/49535e5c509f9a1f48a034f19d48a89b22872b29'} />
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