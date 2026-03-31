import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const now = new Date().toLocaleString('pt-BR');

    console.log(`[${now}] Chamada recebida: ${method} na rota ${url}`);
    
    next();
  }
}