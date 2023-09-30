import * as jwt from 'jsonwebtoken';

export function decodeToken(token: string) {
  const tokenSplit = token.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;

  const decodedToken = jwt.verify(tokenSplit, jwtSecret) as {
    id: string;
    name: string;
    email: string;
    permissionLevel: number;
  };

  return decodedToken;
}
