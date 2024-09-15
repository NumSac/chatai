import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatInstance } from './chat-instance.entity';

@Entity()
export class LlmUserMessage {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => ChatInstance, (chatInstance) => chatInstance.llmUserMessages)
  chatInstance: ChatInstance;
}
