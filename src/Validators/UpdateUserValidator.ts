import { IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateUserValidator {
  @IsOptional()
  @Length(3, 20, { message: 'name must be between 3 and 20 characters' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email!' })
  email?: string;


  @IsOptional()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password?: string;

  constructor(source: Partial<UpdateUserValidator>) {
    Object.assign(this, source);
  }
}
