import { useRouter } from 'next/router';
import { useQuery } from '../../../../hooks';
import { Layout, Loading } from '../../../../components';
import ViewActiveJob from '../../../../components/Jobs/ViewActiveJob';
import { checkAuth, withAuth } from '../../../../auth';

const Page = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { data, status, refetch, dataUpdatedAt } = useQuery(`/user/posts/${uuid}?type=view`);
  return (
    <Layout role="client">
      <div className="prose max-w-full"></div>
      {status == 'error' && <div>Error in retrieving the data</div>}
      {status == 'loading' && <Loading />}
      {status == 'success' && (
        <ViewActiveJob
          role="client"
          post={data}
          dataUpdatedAt={dataUpdatedAt}
          refetch={refetch}
        ></ViewActiveJob>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
