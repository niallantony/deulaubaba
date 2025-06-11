export type User = {
  userType: string;
  name: string;
  username: string;
  email: string;
  password: string;
  userId?: string;
}

export type UserResponse = {
  userId: string;
  username: string;
  name: string;
  email: string;
  token: string;
}

export type UserAvatar = {
  id: string;
  src: string;
  type: string;
}
