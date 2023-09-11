import type { RequestHandler } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../services/users.services';
import { formatResponse } from '../utils';

export const index: RequestHandler = async (req, res, next) => {
  try {
    const users = await getUsers();

    res.json(formatResponse(users));
  } catch (error) {
    next(error);
  }
};

export const show: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.json(formatResponse(user));
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(formatResponse(user));
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await updateUser(id, { ...req.body, edited: true });

    res.json(formatResponse(user));
  } catch (error) {
    next(error);
  }
};

export const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await deleteUser(id);

    res.json(formatResponse(user));
  } catch (error) {
    next(error);
  }
};
