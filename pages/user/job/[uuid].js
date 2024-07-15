import { useRouter } from 'next/router';
import { checkAuth, withAuth } from '../../../auth';
import { Layout, Loading } from '../../../components';
import { useQuery } from '../../../hooks';
import ViewJobUser from '../../../components/Jobs/ViewJobUser';

const Page = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { data, status, refetch, dataUpdatedAt } = useQuery(`/user/posts/${uuid}?type=view`);
  return (
    <Layout role="user">
      <div className="prose max-w-full"></div>
      {status == 'error' && <div>Error in retrieving the data</div>}
      {status == 'loading' && <Loading />}
      {status == 'success' && (
        <ViewJobUser
          role="user"
          post={data}
          dataUpdatedAt={dataUpdatedAt}
          refetch={refetch}
        ></ViewJobUser>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
