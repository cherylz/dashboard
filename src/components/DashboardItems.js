import React from 'react';
import { formatNumber } from '../helpers';

class DashboardItems extends React.Component {
  render() {
    if (!Object.keys(this.props.selectedAccount).length) {
      return (
        <div className="dashboard-items">
          Something went wrong but no worries. Please call our 24-hour international toll-free
          hotline +886 2 8502 6866 for help.
        </div>
      );
    }

    const {
      creationDate,
      accountNumber,
      chargeDate,
      nextPaymentDate,
      status,
      currency,
      investmentAmountPerMonth,
      accumulatedInvestmentAmount,
      currentMarketValue
    } = this.props.selectedAccount;

    return (
      <div className="dashboard-items">
        <div className="account-header">
          <h2>Manage</h2>
          <button>Enquire history</button>
        </div>
        <div className="account-details">
          <div className="account-detail">
            <span>
              Creation date: <span className="account-detail-hl">{creationDate}</span>
            </span>
          </div>
          <div className="account-detail">
            <span>
              Investment amount: <span className="currency">{currency}</span>{' '}
              <span className="account-detail-hl">{formatNumber(investmentAmountPerMonth)}</span>{' '}
              <span className="account-detail-note">(per month)</span>
            </span>
            <button>Adjust amount</button>
          </div>
          <div className="account-detail">
            <span>
              Account number: <span className="account-detail-hl">{accountNumber}</span>
            </span>
            <i className="fas fa-pen" onClick={this.props.openPopupToChangeAccount} />
          </div>
          <div className="account-detail">
            <span>
              Accumulated investment amount: <span className="currency">{currency}</span>{' '}
              <span className="account-detail-hl">{formatNumber(accumulatedInvestmentAmount)}</span>
            </span>
          </div>
          <div className="account-detail">
            <span>
              Charge date: <span className="account-detail-hl">{chargeDate}</span>{' '}
              <span className="account-detail-note">(Next payment date: {nextPaymentDate})</span>
            </span>
            <i className="fas fa-pen" />
          </div>
          <div className="account-detail">
            <span>
              Current market value: <span className="currency">{currency}</span>{' '}
              <span className="account-detail-hl">{formatNumber(currentMarketValue)}</span>
            </span>
            <button>Redemption</button>
          </div>
          <div className="account-detail">
            <span>
              Status: <span className="account-detail-hl">{status}</span>
            </span>
            <button>Suspension of investment</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardItems;
