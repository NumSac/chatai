import { IsNotEmpty, IsString } from 'class-validator';

export class ChatMessageReqDto {
  @IsNotEmpty()
  @IsString()
  user_query: string;
}
