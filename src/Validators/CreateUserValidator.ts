import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserValidator {
  @Length(3, 55, { message: 'name must be between 3 and 55 characters' })
  name: string = '';

  @IsEmail({}, { message: 'Invalid email!' })
  email: string = '';

  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string = '';

  constructor(source: Partial<CreateUserValidator>) {
    Object.assign(this, source);
  }
}
