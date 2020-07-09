import styled from 'styled-components';

const Main = styled.main`
  display: grid;
  place-items: center;
  margin: 1rem;

  @media (max-width: 450px) {
    margin: 10px;
  }
`;

export default Main;
