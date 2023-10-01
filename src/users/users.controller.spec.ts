import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { userMock } from '../mocks/user-mock';
import { newUserMock } from '../mocks/new-user-mock';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';

describe('UsersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;

  const mockUserService = {
    findAll: jest.fn().mockRejectedValueOnce([userMock]),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updatePassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('Should be defined', async () => {
    expect(usersController).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('Should return all users', async () => {
      mockUserService.findAll = jest.fn().mockResolvedValue([userMock]);

      const result = await usersController.getAllUsers({});
      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual([userMock]);
    });
  });

  describe('createUser', () => {
    it('Should create new user', async () => {
      mockUserService.create = jest.fn().mockResolvedValue(userMock);

      const result = await usersController.createUser(newUserMock as User);
      expect(usersService.create).toHaveBeenCalled();
      expect(result).toEqual(userMock);
    });
  });

  describe('updateUser', () => {
    it('Should update user', async () => {
      mockUserService.update = jest.fn().mockResolvedValue(userMock);

      const result = await usersController.updateUser(
        '5f9d4f9e5a7d3b2c3c7e5f9d',
        newUserMock as User,
      );
      expect(usersService.update).toHaveBeenCalled();
      expect(result).toEqual(userMock);
    });
  });

  describe('deleteUser', () => {
    it('Should delete user', async () => {
      mockUserService.delete = jest.fn().mockResolvedValue(null);

      const result = await usersController.deleteUser(
        '5f9d4f9e5a7d3b2c3c7e5f9d',
      );
      expect(usersService.delete).toHaveBeenCalled();
      expect(result).toEqual(null);
    });
  });

  describe('updatePassword', () => {
    it('Should update password', async () => {
      mockUserService.updatePassword = jest.fn().mockResolvedValue(userMock);

      const result = await usersController.updatePassword({
        id: '5f9d4f9e5a7d3b2c3c7e5f9d',
        password: '123456',
      });
      expect(usersService.updatePassword).toHaveBeenCalled();
      expect(result).toEqual(userMock);
    });
  });
});
