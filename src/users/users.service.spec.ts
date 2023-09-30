import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { userMock } from '../mocks/user-mock';
import { Model } from 'mongoose';
import { newUserMock } from '../mocks/new-user-mock';

describe('UsersService', () => {
  let usersService: UsersService;
  let model: Model<User>;

  const mockUserService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('findAll', () => {
    it('Should return an array of users', async () => {
      const query = { page: '1', keyword: 'Go Tallos' };

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([userMock]),
            }),
          }) as any,
      );

      const result = await usersService.findAll(query);

      expect(model.find).toHaveBeenCalledWith({
        name: { $regex: 'Go Tallos', $options: 'i' },
      });
      expect(result).toEqual([userMock]);
    });
  });

  describe('create', () => {
    it('Should create and return a user', async () => {
      jest.spyOn(model, 'create').mockResolvedValueOnce(userMock as any);

      const result = await usersService.create({
        ...newUserMock,
        executorId: 'some-executor-id',
      } as User);

      expect(result).toEqual(userMock);
    });
  });

  describe('findById', () => {
    it('Should return a user', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(userMock);

      const result = await usersService.findById(userMock._id);

      expect(model.findById).toHaveBeenCalledWith(userMock._id);
      expect(result).toEqual(userMock);
    });
  });
});
