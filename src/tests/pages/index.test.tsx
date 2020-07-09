import { render } from '@testing-library/react';

import Home from '../../pages/index';

describe('Index page', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should insert SearchUser view', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Search:')).not.toBeNull();
  });
});
