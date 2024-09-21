import { Type } from 'class-transformer';
import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { MessageDto } from './message.dto';

export class CreateChatDto {
  @IsArray({ message: 'Messages must be an array' })
  @ValidateNested({ each: true })
  @Type(() => MessageDto) // This is necessary to transform the array of plain objects into MessageDto instances
  messages: MessageDto[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number) // Convert the incoming string to a number automatically
  n?: number = 1;

  @IsNumber()
  @Min(-2, { message: 'Presence penalty must be at least -2' })
  @Max(2, { message: 'Presence penalty cannot be greater than 2' })
  @IsOptional()
  @Type(() => Number) // Convert the incoming string to a number automatically
  presence_penalty?: number = 0;

  @IsBoolean()
  @IsOptional()
  stream?: boolean = false;
}
