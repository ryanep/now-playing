import React from 'react';
import { mount } from 'enzyme';
import Progress from './index';

jest.useFakeTimers();

describe('components/Progress', () => {
  const progress = 1000;
  const duration = 3000;
  let component;

  beforeEach(() => {
    component = mount(<Progress progress={progress} duration={duration} />);
  });
  it('renders the progress bar', () => {
    component = mount(<Progress progress={progress} duration={duration} />);
    expect(component.find('progress').length).toEqual(1);
  });

  it('sets the progress state to 1/1000th of the provided value', () => {
    expect(component.state('progress')).toEqual(1);
  });

  it('sets the value prop to state.progress', () => {
    expect(component.find('progress').props().value).toEqual(
      component.state('progress')
    );
  });

  it('sets the max prop to props.duration / 1000', () => {
    expect(component.find('progress').prop('max')).toEqual(
      component.prop('duration') / 1000
    );
  });

  it('calls updateProgress in the constructor', () => {
    const mock = jest.spyOn(Progress.prototype, 'updateProgress');
    component = mount(<Progress progress={progress} duration={duration} />);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('polls updateProgress every 500ms', () => {
    jest.useFakeTimers();
    component = mount(<Progress progress={progress} duration={duration} />);
    expect(setTimeout.mock.calls.length).toBe(1);
    const [fn, interval] = setTimeout.mock.calls[0];
    expect(interval).toBe(500);
    const mock = jest.spyOn(Progress.prototype, 'updateProgress');
    mock.mockClear();
    fn();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('sets the state.progress to state.progress + 0.5 if the track is playing', () => {
    jest.useFakeTimers();
    component = mount(<Progress progress={progress} duration={duration} />);
    const [fn] = setTimeout.mock.calls[0];
    component.setProps({ isPlaying: true });
    fn();
    expect(component.state('progress')).toEqual(progress / 1000 + 0.5);
  });
});
