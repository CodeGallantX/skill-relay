export const signIn = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        resolve({ message: 'Sign in successful!', user: { email: credentials.email } });
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

export const signUp = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, you'd send this to a backend and handle unique email checks, etc.
      resolve({ message: 'Sign up successful!', user: { email: userData.email } });
    }, 1000);
  });
};
