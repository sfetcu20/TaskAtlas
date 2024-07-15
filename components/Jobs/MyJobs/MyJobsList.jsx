import { useRouter } from 'next/router';
import { usePathname } from 'next/dist/client/components/navigation';

import updateQuery from '../../../functions/update-query';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import ResultsFound from '../../ResultsFound';
import Loading from '../../Loading';
import { toaster } from '../../../lib';
import ListJobsSuccess from '../ListJobsSuccess';
import Pagination from '../../Pagination';
import { useQuery } from '../../../hooks';

const MyJobsList = ({ options }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, dataUpdatedAt, refetch, status, ...props } = useQuery(`client/my-posts`, options);

  const handlePageChange = (page) => {
    const query = updateQuery('page', page, options);
    router.push({ pathname, query });
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      // Retrieve the saved scroll position from sessionStorage
      const scrollPosition = sessionStorage.getItem('scrollPosition');

      // If a scroll position was saved, scroll to that position
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-col rounded-lg px-4 sm:bg-white sm:shadow border-t ">
        <div className="hidden items-center justify-between gap-1 pb-2 sm:flex sm:border-b sm:py-4">
          <div className="flex items-center gap-2">
            <ResultsFound count={data?.pageParams?.count || 0} />
          </div>
        </div>
      </div>
      <div className="hidden flex-col gap-4 sm:flex mt-5">
        {status === 'loading' && <Loading />}
        {status === 'error' &&
          (() => {
            toaster.error('Jobs could not be loaded!');
          })()}
        {status === 'success' && (
          <>
            <ListJobsSuccess
              key={`post-${dataUpdatedAt}`}
              options={options}
              refetch={refetch}
              {...data}
            />
            <Pagination
              key={`pagination-${dataUpdatedAt}`}
              currentPage={data?.pageParams?.page}
              onPageChange={handlePageChange}
              totalPages={Math.ceil(data?.pageParams?.count / data?.pageParams?.perPage)}
              {...props}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MyJobsList;
