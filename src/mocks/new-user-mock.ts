import { permissionLevel } from '../schemas/user.schema';

export const newUserMock = {
  name: 'Go Tallos',
  email: 'test@gmail.com',
  permissionLevel: permissionLevel.ADMIN,
  password: '123456',
};
