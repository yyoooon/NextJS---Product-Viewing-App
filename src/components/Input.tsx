/* eslint-disable react/display-name */
import styled from '@emotion/styled';
import { forwardRef } from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, className, ...props }, ref) => {
    return (
      <Container className={className}>
        <Label>{label}</Label>
        <StyledInput ref={ref} vaild={errorMessage ? false : true} {...props} />
        {errorMessage && <Text>{errorMessage}</Text>}
      </Container>
    );
  }
);

export default Input;

const Container = styled.div`
  width: 100%;
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
