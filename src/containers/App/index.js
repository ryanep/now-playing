import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import styles from "./style.scss";
import * as authActions from "../../actions/auth";
import * as trackActions from "../../actions/tracks";
import queryString from "query-string";

import Track from "../../components/Track";
import Login from "../../components/Login";

class App extends Component {
  componentDidMount() {
    this.getTokenFromCallbackHandler();

    if (this.props.accessToken) this.props.getCurrentTrack();
  }

  getTokenFromCallbackHandler() {
    if (window.location.pathname === "/cb") {
      let { code } = queryString.parse(window.location.search);

      if (code) {
        this.props.getAccessTokenFromCode(code);
      }
    }
  }

  render() {
    if (this.props.currentTrack) {
      const { title, artist } = this.props.currentTrack;
    }

    return (
      <div className={styles.app}>
        <Helmet title="Login - Now Playing" />
        {this.props.accessToken
          ? <Track track={this.props.currentTrack} />
          : <Login />}
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
      dispatch(authActions.accessTokenRequested(code)),
    getAccessTokenFromRefresh: () => dispatch(),
    getCurrentTrack: () => dispatch(trackActions.trackRequested())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
