import { permissionLevel } from '../schemas/user.schema';

export const newUserMock = {
  name: 'Go Tallos',
  email: 'test@gmail.com',
  permissionLevel: permissionLevel.ADMIN,
  crearedBy: 'system',
  password: '123456',
  createdBy: '65144effc2180248ccdd8345',
};
