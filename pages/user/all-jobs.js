import { useState } from 'react';
import { Layout } from '../../components';
import NavigationHeader from '../../components/Client/NavigationHeader';
import JobsFilters from '../../components/Jobs/JobsFilter';

import { checkAuth, withAuth } from '../../auth';
import JobsList from '../../components/Jobs/JobsList';
const Page = () => {
  const [options, setOptions] = useState({ per_page: 30 });

  return (
    <Layout role="user">
      <div className="prose max-w-full">
        <NavigationHeader />
        <JobsFilters setOptions={setOptions} />
        <JobsList options={options} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
