import { checkAuth, withAuth } from '../../../auth';
import { Layout } from '../../../components';

const Page = () => {
  return (
    <Layout role="client">
      <div className="prose max-w-full"></div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
