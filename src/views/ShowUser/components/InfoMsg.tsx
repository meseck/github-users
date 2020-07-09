import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

type Props = {
  validInput: string;
  isLoading: boolean;
  isError: Error;
};

const InfoMsg = ({ validInput, isLoading, isError }: Props): JSX.Element => {
  return (
    <div>
      {!validInput && (
        <>
          <h1>This is not valid GitHub username.</h1>
          <p>The GitHub username constraints are:</p>
          <ul>
            <li>Must not be longer than 39 characters.</li>
            <li>Can only consist of letters, numbers and simple hyphens.</li>
            <li>Must not begin or end with a hyphen.</li>
            <li>Cannot have consecutive hyphens.</li>
          </ul>
          <IoIosArrowBack />
          <Link href="/">
            <a>Please go back to continue your search.</a>
          </Link>
        </>
      )}
      {!isLoading && isError && (
        <>
          <h1>
            No one with the username &quot;{validInput}&quot; was found on
            GitHub.
          </h1>
          <IoIosArrowBack />
          <Link href="/">
            <a>Please go back to continue your search.</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default InfoMsg;
