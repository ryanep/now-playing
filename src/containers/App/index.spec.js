import React from 'react';
import { shallow } from 'enzyme';
import { App } from './index';
import Helmet from 'react-helmet';
import Track from '../../components/Track';
import Login from '../../components/Login';
import configureStore from 'redux-mock-store';
import ConnectedApp from './index';
import { accessTokenRequested } from '../../actions/auth';
import { trackRequested } from '../../actions/tracks';

describe('component containers/App', () => {
  describe('componentDidMount', () => {
    it('calls getTokenFromCallbackHandler', () => {
      const mock = jest.spyOn(App.prototype, 'getTokenFromCallbackHandler');
      const component = shallow(<App />);
      component.instance().componentDidMount();
      expect(mock).toHaveBeenCalledTimes(1);
    });

    it('calls props.getCurrentTrack if props.accessToken is present', () => {
      const props = {
        accessToken: '__access_token__',
        getCurrentTrack: jest.fn()
      };

      const component = shallow(<App {...props} />);
      component.instance().componentDidMount();
      expect(props.getCurrentTrack).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTokenFromCallbackHandler', () => {
    it('calls props.getAccessTokenFromCode with the code as an argument', () => {
      const props = {
        getAccessTokenFromCode: jest.fn()
      };
      const code = '__code__';
      Object.defineProperty(window.location, 'pathname', {
        writable: true,
        value: `/cb`
      });
      Object.defineProperty(window.location, 'search', {
        writable: true,
        value: `code=${code}`
      });
      const component = shallow(<App {...props} />);
      component.instance().getTokenFromCallbackHandler();
      expect(props.getAccessTokenFromCode).toHaveBeenCalledTimes(1);
      expect(props.getAccessTokenFromCode).toHaveBeenCalledWith('__code__');
    });

    it('doesnt call props.getAccessTokenFromCode if no code is present', () => {
      const props = {
        getAccessTokenFromCode: jest.fn()
      };
      Object.defineProperty(window.location, 'pathname', {
        writable: true,
        value: `/cb`
      });
      Object.defineProperty(window.location, 'search', {
        writable: true,
        value: `xyz=__xyz__`
      });
      const component = shallow(<App {...props} />);
      component.instance().getTokenFromCallbackHandler();
      expect(props.getAccessTokenFromCode).toHaveBeenCalledTimes(0);
    });

    it('noop if location.pathname !== cb', () => {
      const props = {
        getAccessTokenFromCode: jest.fn()
      };
      Object.defineProperty(window.location, 'pathname', {
        writable: true,
        value: `/xyz`
      });
      const component = shallow(<App {...props} />);
      component.instance().getTokenFromCallbackHandler();
      expect(props.getAccessTokenFromCode).toHaveBeenCalledTimes(0);
    });
  });

  describe('render', () => {
    it('renders Helmet with the correct title', () => {
      const component = shallow(<App />);
      expect(component.find(Helmet).length).toEqual(1);
      expect(component.find(Helmet).prop('title')).toEqual(
        'Login - Now Playing'
      );
    });

    describe('props.accessToken is present', () => {
      const props = {
        accessToken: '__access_token__',
        currentTrack: '__current_track__'
      };
      let component;

      beforeEach(() => {
        component = shallow(<App {...props} />);
      });

      it('renders Track', () => {
        expect(component.find(Track).length).toEqual(1);
      });

      it('renders Track with props.currentTrack as the track prop', () => {
        expect(component.find(Track).prop('track')).toEqual(
          '__current_track__'
        );
      });
    });

    describe('props.accessToken not present', () => {
      it('renders Login', () => {
        const component = shallow(<App />);
        expect(component.find(Login).length).toEqual(1);
      });
    });
  });
});

describe('connected containers/App', () => {
  const initialState = {
    tracks: {
      currentTrack: '__current_track__'
    },
    auth: {
      accessToken: '__access_token__'
    }
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedApp store={store} />);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });

  it('renders state.tracks.currentTrack as currentTrack prop', () => {
    expect(container.prop('currentTrack')).toEqual(
      initialState.tracks.currentTrack
    );
  });

  it('renders state.auth.accessToken as accessToken prop', () => {
    expect(container.prop('accessToken')).toEqual(
      initialState.auth.accessToken
    );
  });

  it('dispatches an accessTokenRequested action when props.getAccessTokenFromCode is called', () => {
    const code = '__code__';
    container.props().getAccessTokenFromCode(code);
    expect(store.getActions()[0]).toEqual(accessTokenRequested(code));
  });

  it('dispatches a trackRequested action when props.getCurrentTrack is called', () => {
    container.props().getCurrentTrack();
    expect(store.getActions()[0]).toEqual(trackRequested());
  });
});
