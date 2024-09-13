import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class LlmUserMessage {
  @Column({
    type: 'text',
    nullable: false,
  })
  humanMessage: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  aiMessage: string;
}
