import { IsEnum, IsString, MinLength } from 'class-validator';

export enum Role {
  Assistant = 'assistant',
  System = 'system',
  User = 'user',
}

export class MessageDto {
  @IsEnum(Role, { message: 'Role must be one of: assistant, system, user' })
  role: Role;

  @IsString({ message: 'Content must be a string' })
  @MinLength(1, { message: 'Content cannot be empty' })
  content: string;
}
