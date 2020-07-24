import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.31rem 0.44rem;
  font-size: 1.56rem;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 4px;

  &:focus {
    border: 2px solid #2d5aaa;
    outline: unset;
  }

  &.disabled {
    color: #d7d7d7;
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0);

    &:focus {
      border: 2px solid indianred;
      outline: none;
    }
  }
`;

type Props = {
  onPageNavigation: (event: MouseEvent<HTMLButtonElement>) => void;
  currentPage: number;
  numberOfPages: number;
};

const PageNavigation: React.FC<Props> = ({
  onPageNavigation,
  currentPage,
  numberOfPages,
}) => {
  return (
    <Container>
      <Button
        id="previous-page"
        name="Go to previous page"
        onClick={onPageNavigation}
        className={currentPage === 1 ? 'disabled' : null}
      >
        <IoIosArrowBack />
      </Button>{' '}
      {currentPage} / {numberOfPages}{' '}
      <Button
        id="next-page"
        name="Go to next page"
        onClick={onPageNavigation}
        className={currentPage === numberOfPages ? 'disabled' : null}
      >
        <IoIosArrowForward />
      </Button>
    </Container>
  );
};

export default PageNavigation;
