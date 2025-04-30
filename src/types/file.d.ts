export interface FileItem {
  id: string;
  file_name: string;
  status: string;
  created_at: string;
  meta: {
    name: string;
    size: number;
    content_type: string;
    collection_name: string;
  };
}
