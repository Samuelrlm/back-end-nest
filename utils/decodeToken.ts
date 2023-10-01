import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export function decodeToken(token: string) {
  const tokenSplit = token.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;

  try {
    const decodedToken = jwt.verify(tokenSplit, jwtSecret) as {
      id: string;
      name: string;
      email: string;
      permissionLevel: number;
    };

    return decodedToken;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequestException('Token JWT inválido');
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new BadRequestException('Token JWT expirado');
    } else {
      throw new BadRequestException('Erro ao verificar o token JWT');
    }
  }
}
