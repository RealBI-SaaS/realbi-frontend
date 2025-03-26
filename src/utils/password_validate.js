
export const commonPasswords = [
  "password", "123456", "12345678", "qwerty", "abc123", "password1", 
  "123123", "admin", "letmein", "welcome"
];

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (commonPasswords.includes(password.toLowerCase())) {
    return "Password is too common. Choose a stronger one.";
  }
  return null;
};

