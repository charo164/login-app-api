import { Types } from 'mongoose';

export function isValidId(id: string) {
  return Types.ObjectId.isValid(id);
}

export function formatResponse(data: any, message?: string) {
  return {
    message: message || 'Success',
    data,
  };
}
