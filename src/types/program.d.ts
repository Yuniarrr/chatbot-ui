export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  organizer?: string | null;
  type: string;
  start_date?: string | null;
  end_date?: string | null;
  link?: string | null;
  image_url?: string | null;
  uploader?: string | null;
  created_at: string;
  updated_at?: string | null;
}
