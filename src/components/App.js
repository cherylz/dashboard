import React from 'react';
import Header from './Header';
import DashboardContainer from './DashboardContainer';
import AccountNumberChangeBoard from './AccountNumberChangeBoard';
import mockAccounts from '../mock-accounts';

class App extends React.Component {
  state = {
    selectedAccount: {
      creationDate: '2019-01-18',
      accountNumber: '001077019304',
      chargeDate: '1 of the month',
      nextPaymentDate: '2018-11-01',
      status: 'Monthly charge',
      currency: 'TWD',
      investmentAmountPerMonth: 50000,
      accumulatedInvestmentAmount: 50000,
      currentMarketValue: 50011,
      accountBalance: 108900
    },
    accounts: [],
    userCommand: 'none'
  };

  /* Per the exercise requirement, below is the commented out code with ajax calls.

  openPopupToChangeAccount = async () => {
    try {
      const endpoint = `url`; // For demo only. Please provide the correct url based on the API spec.
      const response = await fetch(endpoint);
      const data = await response.json(); // For demo only. Please process and clean the data based on the actual response.
      this.setState({
        accounts: data,
        userCommand: 'changeAccountNumber'
      });
    } catch (err) {
      console.error(err);
    }
  };

  changeSelectedAccount = async newAccount => {
    try {
      const endpoint = `url`; // For demo only. Please provide the correct url based on the API spec.
      const options = {
        method: 'PUT',
        body: JSON.stringify({
          // Provide the correct body based on the API spec. For example:
          selectedAccount: newAccount
        }),
        headers: {
          // Provide required header info. For example:
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(endpoint, options);
      const data = await response.json(); // For demo only. Please process and clean the data based on the actual response.
      this.setState({
        selectedAccount: data,
        userCommand: 'none'
      });
    } catch (err) {
      console.error(err);
    }
  };
  */

  openPopupToChangeAccount = () => {
    const accountsWithKeysInCamelCase = mockAccounts.map(account => {
      const {
        creation_date: creationDate,
        account_number: accountNumber,
        charge_date: chargeDate,
        next_payment_date: nextPaymentDate,
        status,
        currency,
        investment_amount_per_month: investmentAmountPerMonth,
        accumulated_investment_amount: accumulatedInvestmentAmount,
        current_market_value: currentMarketValue,
        account_balance: accountBalance
      } = account;
      return {
        creationDate,
        accountNumber,
        chargeDate,
        nextPaymentDate,
        status,
        currency,
        investmentAmountPerMonth,
        accumulatedInvestmentAmount,
        currentMarketValue,
        accountBalance
      };
    });

    this.setState({
      accounts: accountsWithKeysInCamelCase,
      userCommand: 'changeAccountNumber'
    });
  };

  changeSelectedAccount = newAccount => {
    this.setState({
      selectedAccount: newAccount,
      accounts: [],
      userCommand: 'none'
    });
  };

  closePopup = () => {
    this.setState({
      accounts: [],
      userCommand: 'none'
    });
  };

  getPopupComponent = userCommand => {
    const popupComponents = {
      changeAccountNumber: () => (
        <AccountNumberChangeBoard
          selectedAccount={this.state.selectedAccount}
          accounts={this.state.accounts}
          changeSelectedAccount={this.changeSelectedAccount}
          closePopup={this.closePopup}
        />
      ),
      none: () => null
    };
    return popupComponents[userCommand]();
  };

  render() {
    const popupComponent = this.getPopupComponent(this.state.userCommand);
    return (
      <div>
        <Header />
        <DashboardContainer
          selectedAccount={this.state.selectedAccount}
          openPopupToChangeAccount={this.openPopupToChangeAccount}
        />
        {popupComponent}
      </div>
    );
  }
}

export default App;
