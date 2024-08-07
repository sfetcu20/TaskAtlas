import { useRouter } from 'next/router';
import { checkAuth, withAuth } from '../../../auth';
import { Layout, Loading } from '../../../components';
import { useQuery } from '../../../hooks';
import ViewJob from '../../../components/Jobs/ViewJob';

const Page = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { data, status, refetch, dataUpdatedAt } = useQuery(`/client/posts/${uuid}?type=view`);
  return (
    <Layout role="client">
      <div className="prose max-w-full"></div>
      {status == 'error' && <div>Error in retrieving the data</div>}
      {status == 'loading' && <Loading />}
      {status == 'success' && (
        <ViewJob
          role="client"
          post={data}
          refetch={refetch}
          dataUpdatedAt={dataUpdatedAt}
        ></ViewJob>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
