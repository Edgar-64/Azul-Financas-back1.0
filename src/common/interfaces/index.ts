export interface User {
  id: number;
  nome: string;    
  email: string;
  senha: string;   
  telefone?: string;
}

export interface Transaction {
  id?: number;
  description: string;
  value: number;
  type: 'receita' | 'gasto';
  userId: number;
  createdAt?: Date;
}