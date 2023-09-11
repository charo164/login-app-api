import type { RequestHandler } from 'express';
import { comparePassword } from '../configs/bcrypt';
import { generateToken } from '../configs/jwt';
import { HttpException } from '../exceptions/HttpException';
import { getGoogleLoginLink, getGoogleUserInfos } from '../services/auth.services';
import { createUser, findByEmailOrName, updateOrCreateUserByGoogleId } from '../services/users.services';
import { RequestWithUser } from '../types/api';
import { formatResponse } from '../utils';
import { AUTH_COOKIE_NAME } from '../utils/constants';

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const user = await findByEmailOrName(req.body.login);

    if (!user) return next(new HttpException(400, 'Login or password incorrect!'));


    const match = await comparePassword(req.body.password, user.password || '#');

    if (!match) return next(new HttpException(400, 'Login or password incorrect!'));

    const token = generateToken({ id: user._id });

    return res.json(formatResponse(token, 'User logged in successfully!'));
  } catch (error) {
    return next(error);
  }
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    const token = generateToken({ id: user._id });

    return res.status(201).json(formatResponse(token, 'User created successfully!'));
  } catch (error) {
    return next(error);
  }
};

export const signOut: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie(AUTH_COOKIE_NAME);

    return res.json(formatResponse({}, 'User logged out successfully!'));
  } catch (error) {
    return next(error);
  }
};

export const googleLoginLink: RequestHandler = async (req, res, next) => {
  try {
    const loginLink = await getGoogleLoginLink();

    return res.json(formatResponse(loginLink, 'Google login link generated successfully!'));
  } catch (error) {
    return res.redirect(
      `${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on getting google login link!`,
    );
  }
};

export const loginWithGoogle: RequestHandler = async (req, res, next) => {
  try {
    if (req.query.error) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`,
      );
    }

    const { code } = req.query;

    if (!code) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`,
      );
    }

    const user = await getGoogleUserInfos(code as string);

    const userExists = await updateOrCreateUserByGoogleId(user.id!, {
      name: user.name!,
      email: user.email!,
      picture: user.picture!,
      googleId: user.id!,
    });

    if (!userExists) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`,
      );
    }

    const token = generateToken({ id: userExists._id });

    return res.redirect(`${process.env.CLIENT_URL}/auth/login?success=true&token=${token}`);
  } catch (error) {
    console.log(error);
    return res.redirect(
      `${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`,
    );
  }
};

export const loggedUser: RequestHandler = (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    return res.json(formatResponse(user, 'User logged in successfully!'));
  } catch (error) {
    return next(error);
  }
};
