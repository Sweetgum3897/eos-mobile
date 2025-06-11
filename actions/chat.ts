import { TQuestion } from '@/types';
import { ApiClient } from '@/utils';

export const getQuestionList = async () => {
  const apiClient = ApiClient();
  return await apiClient.get(`/chat/top-questions`);
};

export const getChatHistory = async (conversationId: number) => {
  const apiClient = ApiClient();
  return await apiClient.get(`/chat/${conversationId}`);
};

export const getConversations = async () => {
  const apiClient = ApiClient();
  return await apiClient.get(`/chat`);
};

export const aiAnswer = async (data: TQuestion) => {
  const apiClient = ApiClient();
  console.log(data);
  return await apiClient.post(`/chat/ai-answer`, data);
};

export const removeHistory = async (conversationId: number) => {
  const apiClient = ApiClient();
  return await apiClient.delete(`/chat/${conversationId}`);
};
