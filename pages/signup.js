import { Link } from '../components';
import { SignupForm } from '../components/Forms';

const SignupPage = () => (
  <main className="cover min-h-screen px-4 py-8 flex flex-col items-center ">
    <div className="px-4 lg:px-12 py-8 my-8 bg-white rounded-lg ">
      <Link href="/login" className="hover:underline">
        ← back to login
      </Link>
      <h2 className="font-bold text-2xl mb-4">Create a new account</h2>
      <SignupForm />
    </div>
  </main>
);

export default SignupPage;
