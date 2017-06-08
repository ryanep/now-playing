import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./style.scss";
import * as authActions from "../../actions/auth";
import * as trackActions from "../../actions/tracks";
import queryString from "query-string";

import Track from "../../components/Track";
import Login from "../../components/Login";

class App extends Component {
  componentDidMount() {
    this.getTokenFromCallbackHandler();
  }

  getTokenFromCallbackHandler() {
    if (window.location.pathname === "/cb") {
      let { code } = queryString.parse(window.location.search);

      if (code) {
        this.props.getAccessTokenFromCode(code);
      }
    }
  }

  pollSpotifyAPI() {
    setTimeout(() => {
      this.props.getCurrentTrack();
    }, 10000);
  }

  render() {
    console.log("rendering");
    if (this.props.accessToken) {
      this.pollSpotifyAPI();
    }

    return (
      <div className={styles.app}>
        {this.props.accessToken && this.props.currentTrack.item ? <Track track={this.props.currentTrack} /> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTrack: state.tracks.currentTrack,
    accessToken: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccessTokenFromCode: code =>
      dispatch(authActions.getAccessTokenFromCode(code)),
    getAccessTokenFromRefresh: () =>
      dispatch(authActions.getAccessTokenFromRefresh()),
    getCurrentTrack: () =>
      dispatch(trackActions.getCurrentTrack())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
