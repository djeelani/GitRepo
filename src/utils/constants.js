import approvedIcon from '../assets/icons/approved_icon.svg';
import readyIcon from '../assets/icons/ready_icon.svg';
import sentIcon from '../assets/icons/sent_icon.svg';
import transactionCompleteIcon
  from '../assets/icons/transaction_complete_icon.svg';
import paymentSentIcon from '../assets/icons/payment_sent_icon.svg';
import shipmentDeliveredIcon from '../assets/icons/received_icon.svg';
import paymentInitiatedIcon from '../assets/icons/app_icon.svg';

export const APPROVE_REJECT_ACTION__TYPE = 'approveRejectAction';
export const TRACKING_ACTION__TYPE = 'trackingAction';
export const SHIPMENT_ACTION__TYPE = 'shipmentAction';
export const PAYMENT_ACTION__TYPE = 'paymentAction';

export const SORT_FIELD_ACTION_REQUIRED = 'Action Required';
export const SORT_FIELD_COUNTER_PARTY = 'Counter-Party';
export const SORT_FIELD_DATE_MODIFIED = 'Date Modified';
export const SHIPPED = 'SHIPPED';
export const ACTION_REQUIRED = 'ACTION REQUIRED';
export const IN_TRANSIT = 'IN TRANSIT';

export const STATUS_CODES = {
  'Transaction Initiated': {
    src: paymentInitiatedIcon,
    alt: 'draft',
  },
  'Transaction Approved': {
    src: approvedIcon,
    alt: 'approvedIcon',
  },
  'Ready For Shipment': {
    src: readyIcon,
    alt: 'readyShip',
  },
  'Items Shipped': {
    src: sentIcon,
    alt: 'sent',
  },
  Shipped: {
    src: sentIcon,
    alt: 'sent',
  },
  'Shipment Delivered': {
    src: shipmentDeliveredIcon,
    alt: 'delivered',
  },
  Delivered: {
    src: shipmentDeliveredIcon,
    alt: 'delivered',
  },
  'Payment Initiated': {
    src: paymentSentIcon,
    alt: 'payInit',
  },
  'Transaction Complete': {
    src: transactionCompleteIcon,
    alt: 'payRcvd',
  },
  Draft: {
    src: paymentInitiatedIcon,
    alt: 'draft',
  },
  'Draft Approved': {
    src: approvedIcon,
    alt: 'approvedIcon',
  },
  'Pending Bank Approval': {
    src: paymentInitiatedIcon,
    alt: 'draft',
  },
  Started: {
    src: paymentInitiatedIcon,
    alt: 'draft',
  },
  'Pending Counter-party Approval': {
    src: paymentInitiatedIcon,
    alt: 'draft',
  },
  'Payment Received': {
    src: transactionCompleteIcon,
    alt: 'payRcvd',
  },
};
