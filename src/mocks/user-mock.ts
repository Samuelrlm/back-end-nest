import { permissionLevel } from '../schemas/user.schema';

export const userMock = {
  _id: '65144effc2180248ccdd8345',
  name: 'Go Tallos',
  email: 'test@gmail.com',
  permissionLevel: permissionLevel.ADMIN,
  crearedBy: 'system',
};
