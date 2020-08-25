import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ResquestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: ResquestDTO): Transaction | null {
    if (!['income', 'outcome'].includes(type))
      throw new Error('Type is not valid');

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value)
      throw new Error('Insufficient funds');

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
