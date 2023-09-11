import { Schema, model } from 'mongoose';
import type { User as UserType } from '../types/models/User';
import { hashPassword, comparePassword } from '../configs/bcrypt';

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 55,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  phone: {
    type: String,
    maxlength: 15,
    default: '',
  },
  bio: {
    type: String,
    maxlength: 255,
    default: '',
  },
  picture: {
    type: String,
    default:
      'https://res.cloudinary.com/dm7loyjwf/image/upload/v1694345191/login-app/profiles/default-profile.jpg',
  },
  edited: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    default: null,
  },
});

UserSchema.pre<UserType>('save', async function (next) {
  try {
    const user = this;

    const hash = await hashPassword(user.password);

    user.password = hash;

    return next();
  } catch (error) {
    return next();
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  const user = this;

  const match = await comparePassword(password, user.password);

  return match;
};

const UserModel = model<UserType>('User', UserSchema);

export default UserModel;
