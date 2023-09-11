export interface User {
  name: string;
  email: string;
  password: string;
  bio: string;
  picture: string;
  phone?: string;
  edited: boolean;
  googleId?: string;
}
