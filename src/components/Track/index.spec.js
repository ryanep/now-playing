import React from 'react';
import { shallow } from 'enzyme';
import Track from './index';
import Helmet from 'react-helmet';
import Background from '../Background';
import Song from '../Song';

describe('components/Track', () => {
  describe('A track prop is provided', () => {
    const track = {
      title: '__title__',
      artist: '__artist__',
      artwork: [{ url: '__img_url__' }]
    };
    let component;

    beforeEach(() => {
      component = shallow(<Track track={track} />);
    });

    it('renders the track view', () => {
      expect(component.find(Helmet).length).toEqual(1);
      expect(component.find(Background).length).toEqual(1);
      expect(component.find(Song).length).toEqual(1);
    });

    it('renders Helmet with the track title and artist as the title', () => {
      expect(component.find(Helmet).prop('title')).toEqual(
        '__title__ - __artist__'
      );
    });

    it('renders Background with the provided artwork as img prop', () => {
      expect(component.find(Background).prop('img')).toEqual('__img_url__');
    });

    it('renders Song and spreads the track as props', () => {
      expect(component.find(Song).prop('title')).toEqual('__title__');
      expect(component.find(Song).prop('artist')).toEqual('__artist__');
      expect(component.find(Song).prop('artwork')).toEqual([
        { url: '__img_url__' }
      ]);
    });
  });

  describe('A track prop is not provided', () => {
    let component;

    beforeEach(() => {
      component = shallow(<Track />);
    });

    it('renders the empty state', () => {
      expect(component.find('p').length).toEqual(1);
      expect(component.find('p').text()).toEqual('Play a track to start');
      expect(component.find(Helmet).length).toEqual(1);
    });

    it('renders Helmet with "Now Playing" as the title', () => {
      expect(component.find(Helmet).prop('title')).toEqual('Now Playing');
    });
  });
});
