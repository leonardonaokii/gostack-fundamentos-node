import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (prevBalance: Balance, transaction: Transaction) =>
        transaction.type === 'outcome'
          ? {
              ...prevBalance,
              outcome: prevBalance.outcome + transaction.value,
            }
          : {
              ...prevBalance,
              income: prevBalance.income + transaction.value,
            },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
