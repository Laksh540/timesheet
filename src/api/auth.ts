// login function
// logout function
// token handling


// api/auth.ts

type LoginResponse = {
  token: string;
  user: {
    email: string;
  };
};


export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email === "admin@test.com" &&
        password === "password"
      ) {
        resolve({
          token: "dummy-token",
          user: {
            email,
          },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};