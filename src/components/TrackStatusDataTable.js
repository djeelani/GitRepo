import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import { connect } from 'react-redux';
import FontIcon from 'react-md/lib/FontIcons';
import moment from 'moment';
import reverse from 'lodash/reverse';

import { STATUS_CODES } from '../utils/constants';
import '../assets/stylesheets/Dashboard.scss';

class TrackStatusDataTable extends Component {
  render() {
    const formatDate = date => {
      return moment(date).format('L');
    };
    const { transactionsHistory } = this.props;
    const rows = transactionsHistory.history.map((item, i) =>
      <TableRow key={i} className={this.renderOddEvenRowsClassname(i)}>
        <TableColumn>
          {this.renderStatusIcon(item.status)}
        </TableColumn>
        <TableColumn
          id="column-role"
          className="track-status__table-column-role"
        >
          {item.companyName}
        </TableColumn>
        <TableColumn className="track-status__table-column-status">
          {item.status}
        </TableColumn>
        <TableColumn className="track-status__table-column-date">
          {formatDate(item.updatedDate)}
        </TableColumn>
      </TableRow>
    );

    const orderedRows = reverse(rows);

    return (
      <div className="track-status">
        <DataTable id="history-table" plain className="track-status__table">
          <TableHeader>
            <TableRow>
              <TableColumn />
              <TableColumn className="track-status__table-column-header">
                Modified By
              </TableColumn>
              <TableColumn className="track-status__table-column-header">
                Status
              </TableColumn>
              <TableColumn className="track-status__table-column-date-header">
                Date (mm/dd/yyyy)
              </TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderedRows}
          </TableBody>
        </DataTable>
      </div>
    );
  }

  renderOddEvenRowsClassname(index) {
    if (index % 2 === 0) {
      return 'track-status__tablerow tr-odd';
    } else {
      return 'track-status__tablerow tr-even';
    }
  }

  renderStatusIcon(status) {
    if (status === 'Rejected') {
      return <FontIcon className="track-status__reject-icon">cancel</FontIcon>;
    } else {
      return (
        <img src={STATUS_CODES[status].src} alt={STATUS_CODES[status].alt} />
      );
    }
  }
}

TrackStatusDataTable.propTypes = {
  transactionsHistory: PropTypes.object,
};

function mapState(state) {
  return {
    transactionsHistory: state.tradeTransaction.transactionsHistory,
  };
}

export default connect(mapState)(TrackStatusDataTable);
