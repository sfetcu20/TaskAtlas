import { Menu, MenuButton, Profile, ErrorBoundary } from '.';

const Layout = ({ title, children, role }) => {
  return (
    <div className="font-body text-sm min-h-screen bg-gray-100 flex">
      <Menu role={role} />
      <main className="max w-full light-lime lg:col-span-5 p-4 lg:p-8 xl:px-12 gap-4">
        <div className="flex items-center mb-12">
          <div className="flex flex-1">
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <Profile />
          <MenuButton />
        </div>
        <div className="grid gap-4">
          <ErrorBoundary>
            <div className="bg-white rounded border border-gray-300 p-4">{children}</div>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

export default Layout;
