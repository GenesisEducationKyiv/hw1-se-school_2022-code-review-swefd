import { IsEmail, IsString } from 'class-validator';

export class SubscribeEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}
