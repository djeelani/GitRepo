import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';

import TrackStatusDataTable from '../../src/components/TrackStatusDataTable';

describe('Container: TrackStatusDataTable', () => {
  let trackStatusDataTable;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <TrackStatusDataTable />
      </Provider>
    );
    trackStatusDataTable = wrapper.find(TrackStatusDataTable);
  });

  it('renders without crashing', () => {
    expect(trackStatusDataTable.exists()).toBe(true);
  });

  it('renders the Date column', () => {
    expect(
      wrapper.find('.track-status__table-column-date-header').text()
    ).toContain('Date (mm/dd/yyyy)');
  });

  it('renders two column headers', () => {
    expect(wrapper.find('.track-status__table-column-header').length).toEqual(
      2
    );
  });
});
