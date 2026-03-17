export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  age: number | null;
  grade: string | null;
  major: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number | null;
  grade: string;
  major: string;
}
