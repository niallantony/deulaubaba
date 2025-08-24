import { RegistrationErrorType } from "@/types/registrationErrors"
import { User } from "@/types/user"

export const login = async (username: string, password: string) => {
  await wait(500)
  if (username === "niallantony" && password === "password") {
    return {
      status: 200,
      user: {
        userId: "1",
        username: "niallantony",
        name: "Niall Craven",
        email: "niallantony@example.com",
        token: "fake-jwt-token",
      }
    }
  }
  else return {
    status: 401,
    message: "Incorrect user details",
  }
}


export const postUser = async (user: User, confirm: string) => {
  const errors: RegistrationErrorType = {};
  await wait(1000);

  if (!user.userType) {
    errors["userType"] = "User Type not valid";
  }
  if (!user.name) {
    errors["name"] = "Please input a valid name";
  }
  if (!user.username) {
    errors["username"] = "Please input a valid username";
  }
  if (!user.email) {
    errors["email"] = "Please input a valid email address";
  }
  if (!user.password) {
    errors["password"] = "Please input a valid password";
  }
  if (user.password !== confirm) {
    errors["confirm"] = "Passwords do not match"
  }
  if (Object.keys(errors).length === 0) {
    return {
      status: 201,
      message: "User Created",
      data: {
        userType: user.userType,
        username: user.username,
        name: user.name,
        email: user.email,
        id: "000001"
      }
    }
  } else {
    return {
      status: 401,
      message: "Operation failed",
      errors: errors,
    }
  }

}

const wait = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms))
}


