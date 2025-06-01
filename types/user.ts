export type User = {
  userType: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

export type UserResponse = {
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
