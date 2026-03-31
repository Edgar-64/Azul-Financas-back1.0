import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, 
  ) {}

  register(userData: any) {
    return this.usersService.create(userData);
  }

  async login(credentials: any) {
    const user = await this.usersService.findByEmail(credentials.email);


    if (user && user.senha === credentials.senha) {
      
      const payload = { 
        sub: user.id, 
        email: user.email, 
        nome: user.nome 
      };

      return {
        mensagem: 'Login bem-sucedido',
        usuario: {
          id: user.id,
          nome: user.nome,
          email: user.email
        },
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    
    throw new UnauthorizedException('E-mail ou senha incorretos');
  }

  recoverPassword(email: string) {
    const user = this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('E-mail não cadastrado');
    }
    return { message: 'Instruções de recuperação enviadas para o seu e-mail' };
  }
}