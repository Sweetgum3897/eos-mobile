export type TQuestion = {
  conversationId?: number;
  q: string;
  readingId?: string;
  itemId?: string;
};

export type TConversationHistory = {
  id: number;
  userId: number;
  conversationId: number;
  isQuestion: boolean;
  content: string;
};

export type TConversation = {
  id: number;
  title: string;
  readingId?: string;
  itemId?: string;
  createdAt?: string;
};
