import { Link } from '../components';
import { LoginForm } from '../components/Forms';

const IndexPage = () => (
  <main className="cover min-h-screen px-4 py-8 flex flex-col items-center justify-center">
    <div className="flex flex-col w-full px-4 lg:px-12 py-8 my-8 bg-white rounded-lg max-w-xl">
      <h2 className="font-bold text-2xl mb-4">Login</h2>
      <LoginForm />
      <div className="mt-2">
        <Link href="/forgot" className="text-gray-600">
          Forgot password?
        </Link>
      </div>
      <div className="mt-2">
        <Link href="/signup" className="text-gray-600">
          <span className="mr-1">No account yet?</span>
          <span className="text-purple-800 font-bold">Signup now</span>
        </Link>
      </div>
    </div>
  </main>
);

export default IndexPage;
