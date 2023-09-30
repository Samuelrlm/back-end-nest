import { permissionLevel } from '../schemas/user.schema';

export const newUserMock = {
  name: 'Go Tallos',
  email: 'test@gmail.com',
  permissionLevel: permissionLevel.ADMIN,
  password: '123456',
  createdBy: '65144effc2180248ccdd8345',
  executorId: '65144effc2180248ccdd8345',
};
