import rootSaga from './index';

describe('sagas/index', () => {
  it('exposes the expected interface', () => {
    expect(rootSaga).toBeInstanceOf(Function);
  });

  it('exposes the expected shape', () => {
    const gen = rootSaga();
    expect(gen.next().value).toMatchSnapshot();
  });
});
