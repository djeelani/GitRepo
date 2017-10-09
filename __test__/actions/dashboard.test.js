import { sortTransactionSuccess } from '../../src/actions/dashboard';
import { SORT_FIELD_ACTION_REQUIRED } from '../../src/utils/constants';

import * as types from '../../src/actions/actionTypes';

describe('dashbaord actions', () => {
  it('handles the sortTransactionSuccess', () => {
    let transactions = [
      {
        id: 6,
        userId: 4,
        counterPartyUserId: 3,
        poNumber: '67867867',
        billOfLadingNum: '678678678',
        poCreationDate: '2017-08-20T18:30:00.000Z',
        poDeliveryDate: '2017-08-30T18:30:00.000Z',
        price: 100,
        currency: 'USD',
        incoterms: 'CFR',
        deliveryAddress: 'Bangalore',
        shipmentDetails: [
          { name: '1', price: '1', type: '1', quantity: '1', total: '1' },
        ],
        paymentGuarantee: true,
        invoiceFinancing: true,
        statusCode: 'PAY_RCVD',
        createdAt: '2017-08-21T04:55:53.656Z',
        updatedAt: '2017-08-21T04:55:53.656Z',
        seller: {
          id: 4,
          firstName: 'David',
          lastName: 'Boult',
          email: 'sme@sellerbank.com',
          bankCode: 'sellerbank',
          role: 'SELLER-SME',
          companyName: 'Diode Seller, LLC',
        },
        buyer: {
          id: 3,
          firstName: 'James',
          lastName: 'Hazelwood',
          email: 'sme@buyerbank.com',
          bankCode: 'buyerbank',
          role: 'BUYER-SME',
          companyName: 'Diode Buyer, Inc.',
        },
        status: { code: 'PAY_RCVD', displayText: 'Payment Received' },
        documents: [
          {
            id: 3,
            name: '_collapsers.scss',
            url: '/documents/1503472994__collapsers.scss',
          },
          { id: 16, name: 'app.json', url: '/documents/1503562305_app.json' },
        ],
        context: {
          currentStatusCode: 'PAY_RCVD',
          role: 'SELLER-BANKER',
          statusDisplay: 'Payment Received',
          actionRequired: false,
          info: 'Transaction completed.',
        },
        expanded: false,
      },
      {
        id: 5,
        userId: 4,
        counterPartyUserId: 3,
        poNumber: 'PO21082017103205',
        billOfLadingNum: 'BL21082017103205',
        poCreationDate: '2017-08-20T18:30:00.000Z',
        poDeliveryDate: '2017-08-30T18:30:00.000Z',
        price: 100,
        currency: 'USD',
        incoterms: 'CFR',
        deliveryAddress: 'Bangalore',
        shipmentDetails: [
          {
            name: 'Moto',
            price: '1',
            type: 'Mobile',
            quantity: '1',
            total: '1',
          },
        ],
        paymentGuarantee: true,
        invoiceFinancing: true,
        statusCode: 'PAY_RCVD',
        createdAt: '2017-08-21T04:55:53.656Z',
        updatedAt: '2017-08-21T04:55:53.656Z',
        seller: {
          id: 4,
          firstName: 'David',
          lastName: 'Boult',
          email: 'sme@sellerbank.com',
          bankCode: 'sellerbank',
          role: 'SELLER-SME',
          companyName: 'Diode Seller, LLC',
        },
        buyer: {
          id: 3,
          firstName: 'James',
          lastName: 'Hazelwood',
          email: 'sme@buyerbank.com',
          bankCode: 'buyerbank',
          role: 'BUYER-SME',
          companyName: 'Diode Buyer, Inc.',
        },
        status: { code: 'PAY_RCVD', displayText: 'Payment Received' },
        documents: [],
        context: {
          currentStatusCode: 'PAY_RCVD',
          role: 'SELLER-BANKER',
          statusDisplay: 'Payment Received',
          actionRequired: true,
          info: 'Transaction completed.',
        },
        expanded: false,
      },
    ];
    const sortByField = SORT_FIELD_ACTION_REQUIRED;
    const action = {
      type: types.SORTACTION_TRANSACTION__SUCCESS,
      transactions,
      sortByField,
    };
    expect(sortTransactionSuccess(transactions, sortByField)).toEqual(action);
  });
});
