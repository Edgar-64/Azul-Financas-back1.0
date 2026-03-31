import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../common/interfaces';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(userData: User) {
    const newUser = { ...userData, id: Date.now() };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  update(id: number, updateData: Partial<User>) {
    const user = this.findOne(id);
    Object.assign(user, updateData);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('Usuário não existe');
    this.users.splice(index, 1);
    return { message: 'Usuário excluído com sucesso' };
  }

  findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
}