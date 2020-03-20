// external
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// internal
import Loading from '../src/components/Loading';

describe('Loading Component', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render standard loading', () => {
    const wrapper = shallow(
      <Loading message="waiting...">Jest Unit Test</Loading>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
