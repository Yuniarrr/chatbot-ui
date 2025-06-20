export interface ConversationItem {
  id: string;
  title: string;
  user_id: null | string;
  sender: null | string;
  created_at: string;
  updated_at: null | string;
}

export interface ListUniqueConversationItem {
  user_id?: string | null;
  sender?: string | null;
  full_name?: string | null;
}

export interface MessageItem {
  id: string;
  message: string;
  created_at: string;
  from_message: string;
  file_url?: string | null;
}
