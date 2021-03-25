import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const totalBalance = this.transactionsRepository.getBalance().total;

    if (type === 'outcome' && value > totalBalance) {
      throw new Error('Saldo insuficiente');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    // console.log('criou transaction');
    return transaction;
  }
}

export default CreateTransactionService;
