import styled from '@emotion/styled';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  errorMessage?: string;
}

const Input = ({ label, errorMessage, className, ...props }: InputProps) => {
  return (
    <Container className={className}>
      <Label>{label}</Label>
      <StyledInput vaild={errorMessage ? false : true} {...props} />
      {errorMessage && <Text>{errorMessage}</Text>}
    </Container>
  );
};

export default Input;

const Container = styled.div`
  width: 100%;
  max-width: 327px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const StyledInput = styled.input<{ vaild: boolean }>`
  display: block;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  margin-top: 8px;
  background-color: ${({ vaild }) => (vaild ? '#f7f7fa' : '#FDEDEE')};
`;

const Text = styled.span`
  display: block;
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
