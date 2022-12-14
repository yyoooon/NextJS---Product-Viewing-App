export const testIdValidation = (id: string): boolean => {
  const regExp = /^[A-Za-z0-9]{5,30}$/;
  return regExp.test(id);
};

export const testPasswordValidation = (password: string): boolean => {
  const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/;
  return regExp.test(password);
};

export const errorMessage: { [key: string]: string } = {
  id: '올바른 아이디 형식으로 입력해주세요.',
  password: '올바른 비밀번호 형식으로 입력해주세요.',
};
