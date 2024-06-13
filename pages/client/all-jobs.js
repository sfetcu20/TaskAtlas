import { useState } from 'react';
import { Layout } from '../../components';
import NavigationHeader from '../../components/Client/NavigationHeader';
import JobsFilters from '../../components/Jobs/JobsFilter';

import { checkAuth, withAuth } from '../../auth';
const Page = () => {
  const [options, setOptions] = useState({ per_page: 30 });

  return (
    <Layout role="client">
      <div className="prose max-w-full">
        <NavigationHeader />
        <JobsFilters setOptions={setOptions} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
