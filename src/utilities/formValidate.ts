export const vaildateId = (id: string): boolean => {
  const regExp = /^[A-Za-z0-9]{5,30}$/;
  console.log(regExp.test(id));
  return regExp.test(id);
};

export const vaildatePassword = (password: string): boolean => {
  const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/;
  return regExp.test(password);
};
