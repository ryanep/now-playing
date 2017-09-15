import React from 'react';
import { shallow } from 'enzyme';
import Login from './index';

describe('components/Login', () => {
  const img = '__img__';
  let component;

  beforeEach(() => {
    component = shallow(<Login />);
  });

  it('renders the login button', () => {
    expect(component.find('a').length).toEqual(1);
  });

  it('sets the href to the Spotify authorisation link', () => {
    expect(component.find('a').props().href).toContain(
      'https://accounts.spotify.com/authorize'
    );
  });
});
