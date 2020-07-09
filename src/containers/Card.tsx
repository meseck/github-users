import styled from 'styled-components';

const Container = styled.section`
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

const Inspectocat = styled.img`
  position: relative;
  bottom: -59px;
  z-index: 100;
  width: 300px;
  margin: 0;

  @media (max-width: 850px) {
    bottom: -27px;
  }
`;

import React from 'react';

type Props = {
  children: JSX.Element;
};

const Card = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Inspectocat src="/inspectocat.png" alt="Inspectocat" />
      <Container>{children}</Container>
    </>
  );
};

export default Card;
