import JobSuccess from './JobSuccess';

const ListJobsSuccess = ({ pages, refetch, role, type }) => {
  const showPost = (post) => {
    return (
      <JobSuccess key={`post-${post?._id}`} post={post} refetch={refetch} role={role} type={type} />
    );
  };

  return <>{pages.map(showPost)}</>;
};

export default ListJobsSuccess;
