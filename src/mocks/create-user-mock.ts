import { permissionLevel } from '../schemas/user.schema';

export const createUserMock = {
  name: 'Go Tallos',
  email: 'test@outlook.com.br',
  permissionLevel: permissionLevel.ADMIN,
};
