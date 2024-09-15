import { Post } from '@nestjs/common';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatInstance } from '../langchain/entities/chat-instance.entity';

@Entity()
export class ApiUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @OneToOne(() => ChatInstance, (chatInstance) => chatInstance.owner)
  chatInstances?: ChatInstance;
}
