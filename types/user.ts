export type User = {
  userType: string;
  name: string;
  username: string;
  email: string;
  imagesrc?: string;
}

export type UserResponse = {
  name: string;
  email?: string;
  imagesrc: string;
  role: { id: number, name: string };
  userType: string;
  username: string;
}

export type UserAvatar = {
  username: string;
  imagesrc: string;
  userType: string;
}
