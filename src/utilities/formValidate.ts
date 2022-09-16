export const testIdValidation = (id: string): boolean => {
  const regExp = /^[A-Za-z0-9]{5,30}$/;
  return regExp.test(id);
};

export const testPasswordValidation = (password: string): boolean => {
  const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/;
  return regExp.test(password);
};
