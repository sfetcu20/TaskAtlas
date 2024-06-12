import { confirm } from '../../api';
import { Loading } from '..';
import { router, toaster } from '../../lib';
import { useQuery } from 'react-query';

const Confirm = ({ hash }) => {
  const { status } = useQuery(`confirm/${hash}`, () => confirm(hash));
  if (status == 'success') {
    toaster.success('Account confirmed!');
    router.push('/login');
  }
  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'error' && (
        <p className="text-red-600 animated fadeIn">Error! Your account was not confirmed.</p>
      )}
      {status === 'success' && (
        <p className="text-green-700 animated fadeIn">Success! Your account was confirmed.</p>
      )}
    </>
  );
};

export default Confirm;
