import { permissionLevel } from '../schemas/user.schema';

export const createUserMock = {
  name: 'Go Tallos',
  email: 'test@gmail.com.br',
  permissionLevel: permissionLevel.ADMIN,
  password: '123456',
};
