import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import UploadDocument from '../../src/containers/UploadDocument';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';

describe('Component: UploadDocument', () => {
  it('renders the file container div', () => {
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <UploadDocument />
      </Provider>
    );
    expect(wrapper.find('.upload-document__multi-file').exists()).toBe(true);
  });

  it('renders the label', () => {
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <UploadDocument />
      </Provider>
    );
    expect(wrapper.find('.upload-document__multi-file label').text()).toContain(
      'UPLOAD DOCUMENT'
    );
  });
});
