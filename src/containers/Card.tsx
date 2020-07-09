import styled from 'styled-components';

const Card = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  padding: 3rem;
  margin: 2rem;
  background-color: white;
  border-radius: 4px;

  @media (max-width: 850px) {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 450px) {
    padding: 3rem 1.5rem 1.5rem 1.5rem;
  }
`;

export default Card;
