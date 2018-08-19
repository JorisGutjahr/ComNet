const SHA256 = require("crypto-js/sha256");
class Transaction {
  /*
  * Class for Transactions without any security,
  * the values can be used directly and manipulated
  */
  constructor(fr,t,amt) {
    this.from = fr;
    this.to = t;
    this.amount = amt;
  }
  confirmTransactions(){
  }
}

module.exports = Transaction;
