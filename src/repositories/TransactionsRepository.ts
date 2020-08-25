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
    const balanceTotal = this.transactions.reduce(
      (balancePrepare, transaction) => {
        const balance = { ...balancePrepare };

        if (transaction.type === 'income') {
          balance.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          balance.outcome += transaction.value;
        }

        return balance;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return {
      ...balanceTotal,
      total: balanceTotal.income - balanceTotal.outcome,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
