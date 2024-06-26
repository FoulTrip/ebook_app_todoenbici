export type ScalarUser = {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  rol: Role;
  avatar: string | undefined | null;
};

export type AuthUser = {
  id: string;
  token: string;
};

export type Role = "Client" | "Admin";
