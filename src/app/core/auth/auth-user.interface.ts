export interface AuthUser {
  login: string;
  id: number;
  avatarUrl: string;
  name: string | null;
  email: string | null;
}
