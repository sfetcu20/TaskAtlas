import { JobsMapComponent, Loading } from '..';
import { useQuery } from '../../hooks';

const JobsMap = ({ options }) => {
  const { data, status } = useQuery('client/posts', options);

  return (
    <div>
      {status == 'success' && (
        <div>
          <JobsMapComponent jobs={data?.pages} />
        </div>
      )}
      {status == 'loading' && <Loading />}
    </div>
  );
};

export default JobsMap;
