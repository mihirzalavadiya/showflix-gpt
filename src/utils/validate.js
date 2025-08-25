export const checkValidation = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!email || !password) {
    return 'Email and password are required.';
  }

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }

  if (!passwordRegex.test(password)) {
    return 'Password must be at least 8 characters long and contain at least one letter and one number.';
  }

  return null; // No validation errors
};
