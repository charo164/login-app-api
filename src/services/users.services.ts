import { validate } from 'class-validator';
import { CreateUserValidator } from '../Validators/CreateUserValidator';
import { UpdateUserValidator } from '../Validators/UpdateUserValidator';
import { hashPassword } from '../configs/bcrypt';
import { HttpException } from '../exceptions/HttpException';
import UserModel from '../models/users.models';
import type { CreateUserRequest } from '../types/api/users';
import { User } from '../types/models/User';
import { isValidId } from '../utils';

export const getUsers = async () => {
  const users = await UserModel.find({}).select('-password -__v').lean();

  return users;
};

export const getUserById = async (id: string) => {
  if (!isValidId(id)) throw new HttpException(400, 'Invalid ID');

  const user = await UserModel.findById(id).select('-password -__v').lean();

  return user;
};

export const createUser = async (body: CreateUserRequest) => {
  const validationErrors = await validate(new CreateUserValidator(body));

  if (validationErrors.length > 0) {
    const message = validationErrors.map((v) => Object.values(v.constraints || {})).join(',');
    throw new HttpException(400, message);
  }

  const user = new UserModel(body);

  await user.save();

  return user;
};

export const updateUser = async (id: string, body: CreateUserRequest) => {
  if (!isValidId(id)) throw new HttpException(400, 'Invalid ID');

  const validationErrors = await validate(new UpdateUserValidator(body), {
    skipUndefinedProperties: true,
  });

  if (validationErrors.length > 0) {
    const message = validationErrors.map((v) => Object.values(v.constraints || {})).join(',');
    throw new HttpException(400, message);
  }

  if (body.password) {
    const hash = await hashPassword(body.password);
    body.password = hash;
  }

  const user = await UserModel.findOneAndUpdate({ _id: id }, body, { new: true })
    .select('-password -__v')
    .lean();

  return user;
};

export const updateOrCreateUserByEmail = async (email: string, body: Partial<User>) => {
  const user = await UserModel.findOne({ email }).select('-__v').lean();

  if (user && user.edited) return user;

  return await UserModel.findOneAndUpdate({ email }, body, { new: true, upsert: true });
};

export const updateOrCreateUserByGoogleId = async (googleId: string, body: Partial<User>) => {
  const user = await UserModel.findOne({ googleId }).select('-__v').lean();

  if (user?.edited) return user;

  return await UserModel.findOneAndUpdate({ googleId }, body, { new: true, upsert: true });
};

export const findByEmailOrName = async (login: string) => {
  return UserModel.findOne({ $or: [{ email: login }, { name: login }] })
    .select('-__v')
    .lean();
};

export const deleteUser = async (id: string) => {
  if (!isValidId(id)) throw new HttpException(400, 'Invalid ID');

  const user = await UserModel.findByIdAndDelete(id).select('-password -__v').lean();

  return user;
};
