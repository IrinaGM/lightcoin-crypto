/*
 * Feature list to implement:
 * Allow multiple accounts to be created - DONE
 * Each account can have many transactions - DONE
 * Allow withdrawals and deposits into accounts - DONE
 * Allow us to retrieve the transaction history of an account (all withdrawals and deposits) - DONE
 * Allow us to retrieve the current balance of the account at any time - DONE
 * Don't allow withdrawals that exceed the remaining balance of the account - DONE
 */

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let b = 0;
    for (const transaction of this.transactions) {
      b += transaction.value;
    }
    return b;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.account.balance + this.value >= 0) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

// DRIVER CODE BELOW
const myAccount = new Account("Liza-G");

console.log("Starting Balance:", myAccount.balance);

console.log("- Test 1 -");

console.log("Trying to withdraw amount grater of account balance should fail");
const transaction1 = new Withdrawal(50.25, myAccount);
transaction1.commit();
console.log("Account Balance After Transaction 1:", myAccount.balance);

console.log("- Test 2 -");

console.log("Depositing into account should succeed");
const transaction2 = new Deposit(120.0, myAccount);
transaction2.commit();
console.log("Account Balance After Transaction 2:", myAccount.balance);

console.log("- Test 3 -");

console.log(
  "Trying to withdraw amount equal to account balance, should succeed"
);
const transaction3 = new Withdrawal(120, myAccount);
transaction3.commit();
console.log("Account Balance After Transaction 3:", myAccount.balance);

console.log("- Account status after tests -");

console.log("End Balance:", myAccount.balance);

console.log("Account Transaction History: ", myAccount.transactions);
