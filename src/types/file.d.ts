export interface FileItem {
  id: string;
  file_name: string;
  file_path: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  user_id: string;
  meta: {
    name: string;
    content_type: string;
    size: number;
    collection_name: string;
  };
}

export interface IUpdateFile {
  file_name?: string;
  meta: {
    name: string;
    content_type: string;
    size: number;
    collection_name: string;
  };
}
