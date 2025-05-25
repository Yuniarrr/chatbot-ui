export interface UserItem {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string | null;
  role: string;
  profile_picture?: string | null;
  nrp?: string | null;
  nip?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

interface IUpdateUser {
  full_name?: string;
  email?: string;
  phone_number?: string | null;
  role?: string;
  password?: string | null;
}
