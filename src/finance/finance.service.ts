import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from '../common/interfaces/index';


@Injectable()
export class FinanceService {
  private transactions: Transaction[] = [];

  create(data: Transaction) {
    const newTransaction = {
      ...data,
      id: Date.now(),
      createdAt: new Date(),
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  findAll(userId?: number) { 
  if (userId) return this.transactions.filter(t => t.userId === userId);
  return this.transactions;
}
  update(id: number, data: Partial<Transaction>) {
    const transaction = this.transactions.find(t => t.id === id);
    if (!transaction) throw new NotFoundException('Transação não encontrada');
    Object.assign(transaction, data);
    return transaction;
  }

  remove(id: number) {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Transação não encontrada');
    this.transactions.splice(index, 1);
    return { message: 'Removido com sucesso' };
  }
}