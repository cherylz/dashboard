import React from 'react';
import PropTypes from 'prop-types';
import DashboardItems from './DashboardItems';

class DashboardContainer extends React.Component {
  static propTypes = {
    selectedAccount: PropTypes.shape({
      creationDate: PropTypes.string,
      accountNumber: PropTypes.string,
      chargeDate: PropTypes.string,
      nextPaymentDate: PropTypes.string,
      status: PropTypes.string,
      currency: PropTypes.string,
      investmentAmountPerMonth: PropTypes.number,
      accumulatedInvestmentAmount: PropTypes.number,
      currentMarketValue: PropTypes.number,
      accountBalance: PropTypes.number
    }),
    openPopupToChangeAccount: PropTypes.func
  };

  render() {
    return (
      <div className="dashboard-container">
        <h1>My Retirement</h1>
        <DashboardItems
          selectedAccount={this.props.selectedAccount}
          openPopupToChangeAccount={this.props.openPopupToChangeAccount}
        />
        <div className="back-home">
          <button className="back-home-btn">Back to Home</button>
        </div>
      </div>
    );
  }
}

export default DashboardContainer;
