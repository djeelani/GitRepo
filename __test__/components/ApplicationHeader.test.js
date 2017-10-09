import { shallow } from 'enzyme';
import React from 'react';

import ApplicationHeader from '../../src/components/ApplicationHeader';

describe('Component: ApplicationHeader', () => {
  const wrapper = shallow(<ApplicationHeader activeTab={'orderDetails'} />);

  it('renders four application header buttons', () => {
    expect(wrapper.find('.application-header__button').length).toBe(4);
  });

  it('has 1 active tab', () => {
    expect(wrapper.find('.active').length).toBe(1);
  });
});
