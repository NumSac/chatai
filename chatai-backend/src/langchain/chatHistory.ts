import { BaseListChatMessageHistory } from "@langchain/core/dist/chat_history";
import {
  BaseMessage,
  mapChatMessagesToStoredMessages,
  mapStoredMessagesToChatMessages,
  StoredMessage,
} from "@langchain/core/messages";

export interface CustomChatMessageHistoryInput {
  sessionId: string;
}

export class CustomChatMessageHistory extends BaseListChatMessageHistory {
  lc_namespace = ["langchain", "stores", "message"];

  sessionId: string;

  // Simulate a real database lazyer, Stores serialized objects.
  db: Record<string, StoredMessage[]> = {};

  constructor(fields: CustomChatMessageHistoryInput) {
    super(fields);
    this.sessionId = this.sessionId;
  }

  async getMessages(): Promise<BaseMessage[]> {
    const messages = this.db[this.sessionId] ?? [];
    return mapStoredMessagesToChatMessages(messages);
  }

  async addMessage(message: BaseMessage): Promise<void> {
    if (this.db[this.sessionId] === undefined) {
      this.db[this.sessionId] = [];
    }
    const serializedMessages = mapChatMessagesToStoredMessages([message]);
    this.db[this.sessionId].push(serializedMessages[0]);
  }

  async addMessages(messages: BaseMessage[]): Promise<void> {
    if (this.db[this.sessionId] === undefined) {
      this.db[this.sessionId] = [];
    }
    const existingMessages = this.db[this.sessionId];
    const serializedMessages = mapChatMessagesToStoredMessages(messages);
    this.db[this.sessionId] = existingMessages.concat(serializedMessages);
  }

  async clear(): Promise<void> {
    delete this.db[this.sessionId];
  }
}
