import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Song from './index';
import AddedBy from '../AddedBy/index';

describe('components/Song', () => {
  const track = {
    title: '__title__',
    artist: '__artist__',
    artwork: [{ url: '__url__' }, { url: '__placeholder__' }],
    added: { name: '__added_by_name__' },
    isPlaying: '__is_playing__',
    progress: '__progress__',
    duration: '__duration__'
  };
  let component;

  beforeEach(() => {
    component = shallow(<Song {...track} />);
  });

  it('renders correctly', () => {
    const component = renderer.create(<Song {...track} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('passes the src and placeholder props to ProgressiveImage', () => {
    const progressiveImage = component.find('ProgressiveImage');
    expect(progressiveImage.length).toEqual(1);
    expect(progressiveImage.prop('src')).toEqual('__url__');
    expect(progressiveImage.prop('placeholder')).toEqual('__placeholder__');
  });

  it('renders the track title', () => {
    expect(component.find('h1').text()).toEqual('__title__');
  });

  it('renders the track artist', () => {
    expect(component.find('h2').text()).toEqual('__artist__');
  });

  it('passes addedBy object to AddedBy component if present', () => {
    const addedBy = component.find(AddedBy);
    expect(addedBy.length).toEqual(1);
    expect(addedBy.prop('name')).toEqual('__added_by_name__');
  });

  it('does not render the AddedBy component if no addedBy object present', () => {
    component = shallow(<Song {...track} added={null} />);
    expect(component.find(AddedBy).length).toEqual(0);
  });

  it('passes isPlaying, progress and duration to Progress component', () => {
    const progress = component.find('Progress');
    expect(progress.length).toEqual(1);
    expect(progress.prop('isPlaying')).toEqual('__is_playing__');
    expect(progress.prop('progress')).toEqual('__progress__');
    expect(progress.prop('duration')).toEqual('__duration__');
  });

  it('passes isPlaying to Visualiser component', () => {
    const visualiser = component.find('Visualiser');
    expect(visualiser.length).toEqual(1);
    expect(visualiser.prop('isPlaying')).toEqual('__is_playing__');
  });
});
