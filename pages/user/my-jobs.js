import { useState } from 'react';
import { Layout } from '../../components';
import NavigationHeader from '../../components/Client/NavigationHeader';

import { checkAuth, withAuth } from '../../auth';

import MyJobsList from '../../components/Jobs/MyJobs/MyJobsList';
import MyJobsFilters from '../../components/Jobs/MyJobsFilter';
const Page = () => {
  const [options, setOptions] = useState({ per_page: 30 });
  const [filtersUpdated, setFiltersUpdated] = useState(new Date());
  return (
    <Layout role="user">
      <div className="prose max-w-full">
        <NavigationHeader />
        <MyJobsFilters
          setOptions={setOptions}
          filtersUpdated={filtersUpdated}
          setFiltersUpdated={setFiltersUpdated}
        />
        <MyJobsList role="user" options={options} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
