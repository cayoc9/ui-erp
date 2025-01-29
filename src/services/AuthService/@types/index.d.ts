declare namespace Auth {
  interface SignInInput {
    email: string;
    password: string;
  }

  interface SignInOutput {
    accessToken: string;
  }
}
