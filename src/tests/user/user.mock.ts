export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export let userData: User = {
  name: "User",
  email: "email@test.com",
  password: "1234",
};

export let userLogin: Login = {
  email: "email@test.com",
  password: "1234",
};
