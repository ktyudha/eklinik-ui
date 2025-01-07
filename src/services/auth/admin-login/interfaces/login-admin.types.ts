export type IMeAdminResponse = Omit<ILoginAdminResponse, "token">;
export interface ILoginAdminResponse {
  user: User;
  role: "admin";
  token: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}
