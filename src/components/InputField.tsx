import styled from 'styled-components';

const InputField = styled.input`
  width: 100%;
  min-width: 100px;
  padding: 0.28rem 0.56rem;
  font-size: 1.22rem;
  border: 1px solid lightgrey;
  border-radius: 4px;

  &:focus {
    border: 2px solid #2d5aaa;
    outline: none;
  }
`;

export default InputField;
