import React from 'react';
import PropTypes from 'prop-types';
import OverlayWrapper from './OverlayWrapper';
import { formatNumber } from '../helpers';

class AccountNumberChangeBoard extends React.Component {
  state = {
    shouldDisplayCurrencyDropdown: false,
    shouldDisplayAccountNumberDropdown: false,
    accountOnDisplay: this.props.selectedAccount
  };

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
    accounts: PropTypes.array,
    changeSelectedAccount: PropTypes.func,
    closePopup: PropTypes.func
  };

  toggleCurrencyDropdownDisplay = () =>
    this.setState(prevState => {
      return {
        shouldDisplayCurrencyDropdown: !prevState.shouldDisplayCurrencyDropdown,
        shouldDisplayAccountNumberDropdown: false
      };
    });

  toggleCurrency = event => {
    const toggledCurrency = event.currentTarget.textContent;
    const details = this.props.accounts.find(account => account.currency === toggledCurrency); // To simplify things for this exercise, we display the first account in that selected currency by default.
    this.setState({
      accountOnDisplay: details
    });
    this.toggleCurrencyDropdownDisplay();
  };

  toggleAccountNumberDropdownDisplay = () =>
    this.setState(prevState => {
      return {
        shouldDisplayAccountNumberDropdown: !prevState.shouldDisplayAccountNumberDropdown,
        shouldDisplayCurrencyDropdown: false
      };
    });

  toggleAccountNumber = event => {
    const toggledAccountNumber = event.currentTarget.textContent;
    const details = this.props.accounts.find(
      account => account.accountNumber === toggledAccountNumber
    );
    this.setState({
      accountOnDisplay: details
    });
    this.toggleAccountNumberDropdownDisplay();
  };

  changeSelectedAccount = () => {
    if (Object.keys(this.state.accountOnDisplay).length) {
      this.props.changeSelectedAccount(this.state.accountOnDisplay);
    }
  };

  render() {
    if (
      !this.props.accounts ||
      !this.props.accounts.length ||
      !this.state.accountOnDisplay ||
      !Object.keys(this.state.accountOnDisplay).length
    ) {
      return (
        <OverlayWrapper>
          <div className="popup">
            <div className="popup-error-prompt">
              Something went wrong but no worries. Please call our 24-hour international toll-free
              hotline +886 2 8502 6866 for help.
            </div>
            <div className="popup-btns">
              <button className="cancel-btn" onClick={this.props.closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </OverlayWrapper>
      );
    }

    const currencyDropdownClass = this.state.shouldDisplayCurrencyDropdown
      ? 'dropdown-menu display-dropdown-menu'
      : 'dropdown-menu';
    const accountNumberDropdownClass = this.state.shouldDisplayAccountNumberDropdown
      ? 'dropdown-menu display-dropdown-menu'
      : 'dropdown-menu';
    const currencyOnDisplay = this.state.accountOnDisplay.currency;
    const accountNumberOnDisplay = this.state.accountOnDisplay.accountNumber;
    const balanceOnDisplay = formatNumber(this.state.accountOnDisplay.accountBalance);

    const uniqueCurrencies = [...new Set(this.props.accounts.map(account => account.currency))];
    const uniqueCurrencyList = uniqueCurrencies.map(currency => (
      <li
        key={currency}
        className={currency === currencyOnDisplay ? 'dropdown-item selected' : 'dropdown-item'}
        onClick={
          currency === currencyOnDisplay ? this.toggleCurrencyDropdownDisplay : this.toggleCurrency
        }
      >
        {currency}
      </li>
    ));

    const filteredAccountNumbers = this.props.accounts
      .filter(account => account.currency === currencyOnDisplay)
      .map(account => account.accountNumber);
    const filteredAccountNumberList = filteredAccountNumbers.map(accountNumber => (
      <li
        key={accountNumber}
        className={
          accountNumber === accountNumberOnDisplay ? 'dropdown-item selected' : 'dropdown-item'
        }
        onClick={
          accountNumber === accountNumberOnDisplay
            ? this.toggleAccountNumberDropdownDisplay
            : this.toggleAccountNumber
        }
      >
        {accountNumber}
      </li>
    ));

    return (
      <OverlayWrapper>
        <div className="popup">
          <div className="popup-header">Change account number:</div>
          <div className="popup-details">
            <div className="instruction">Please select your debit account number:</div>
            <div className="popup-options">
              <div className="dropdown currency-menu">
                <div className="dropdown-active" onClick={this.toggleCurrencyDropdownDisplay}>
                  <span className="currency-in-popup">{currencyOnDisplay}</span>
                  <i className="fas fa-angle-down" />
                </div>
                <ul className={currencyDropdownClass}>{uniqueCurrencyList}</ul>
              </div>
              <div className="dropdown account-number-menu">
                <div className="dropdown-active" onClick={this.toggleAccountNumberDropdownDisplay}>
                  <span className="account-number">{accountNumberOnDisplay}</span>
                  <i className="fas fa-angle-down" />
                </div>
                <ul className={accountNumberDropdownClass}>{filteredAccountNumberList}</ul>
              </div>
              <div className="account-balance">Account balance {balanceOnDisplay}</div>
            </div>
          </div>
          <div className="popup-btns">
            <button className="cancel-btn" onClick={this.props.closePopup}>
              Cancel
            </button>
            <button className="determine-btn" onClick={this.changeSelectedAccount}>
              Determine
            </button>
          </div>
        </div>
      </OverlayWrapper>
    );
  }
}

export default AccountNumberChangeBoard;
