import styled from 'styled-components';
import { MouseEvent } from 'react';

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;
const Button = styled.button`
  padding: 0.31rem 0.44rem;
  border: none;
  border-radius: 4px;

  &.disabled {
    color: grey;
    pointer-events: none;
    background-color: lightgrey;
  }
`;

type Props = {
  onPageNavigation: (event: MouseEvent<HTMLButtonElement>) => void;
  currentPage: number;
  numberOfPages: number;
};

const PageNavigation = ({
  onPageNavigation,
  currentPage,
  numberOfPages,
}: Props): JSX.Element => {
  return (
    <Container>
      <Button
        id="previous-page"
        onClick={onPageNavigation}
        className={currentPage === 1 ? 'disabled' : null}
      >
        Previous
      </Button>{' '}
      {currentPage} / {numberOfPages}{' '}
      <Button
        id="next-page"
        onClick={onPageNavigation}
        className={currentPage === numberOfPages ? 'disabled' : null}
      >
        Next
      </Button>
    </Container>
  );
};

export default PageNavigation;
