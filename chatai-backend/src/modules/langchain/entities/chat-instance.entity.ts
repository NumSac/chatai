import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LlmUserMessage } from './llm-user-message.entity';
import { ApiUser } from 'src/modules/user/user.entity';

@Entity()
export class ChatInstance {
  @PrimaryGeneratedColumn()
  id: number;

  // The owner of the chat instance
  @ManyToOne(() => ApiUser, (apiUser) => apiUser.chatInstances)
  owner: ApiUser;

  // Each Chat Instance will save the previous messages in this array
  @OneToMany(
    () => LlmUserMessage,
    (llmUserMessage) => llmUserMessage.chatInstance,
  )
  llmUserMessages: LlmUserMessage[];
}
