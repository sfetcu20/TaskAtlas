import { useState } from 'react';
import { Layout } from '../../components';
import NavigationHeader from '../../components/Client/NavigationHeader';

import { checkAuth, withAuth } from '../../auth';

import MyJobsList from '../../components/Jobs/MyJobs/MyJobsList';
import MyJobsFilters from '../../components/Jobs/MyJobsFilter';
const Page = () => {
  const [options, setOptions] = useState({ per_page: 30 });

  return (
    <Layout role="client">
      <div className="prose max-w-full">
        <NavigationHeader />
        <MyJobsFilters setOptions={setOptions} />
        <MyJobsList options={options} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
