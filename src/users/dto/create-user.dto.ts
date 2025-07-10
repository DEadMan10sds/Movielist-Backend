import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  surname: string;

  @IsString()
  @IsEmail()
  @MinLength(1)
  email: string;

  @IsString()
  @IsStrongPassword()
  @MinLength(1)
  password: string;
}
