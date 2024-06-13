import { checkAuth, withAuth } from '../../auth';
import { Layout } from '../../components';
import { AddPostForm } from '../../components/Client';

const Page = () => {
  return (
    <Layout role="client">
      <div className="prose max-w-screen-lg">
        <div className="border-b">
          <h2 className="font-semibold mb-4">Add a post</h2>
          <p>
            {' '}
            Please provide as much information as possible about your project. Detailed
            descriptions, clear objectives, and specific requirements will help you attract the best
            freelancers who are perfectly suited for the job. Include information such as the scope
            of work, skills needed, deadlines, and any other relevant details. The more information
            you provide, the better the chances of finding the ideal freelancer to meet your needs.
          </p>
        </div>
        <AddPostForm />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
