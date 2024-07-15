import { useDisclosure } from '../../hooks';
import AreYouSure from '../AreYouSure';
import { axiosAuth, toaster } from '../../lib';

const ConfirmFreelancerModal = ({ isOpen, onClose, onConfirm }) => (
  <AreYouSure
    confirmText="Choose this freelancer"
    goBackText="Back"
    green={true}
    hide={onClose}
    iAmSure={onConfirm}
    isOpen={isOpen}
    title="Choose this freelance"
    actionText="Save"
  >
    Are you sure you want to choose this freelancer for the job?
  </AreYouSure>
);

const ApplicantsList = ({ post, refetch, dataUpdatedAt }) => {
  const modalDisclosure = useDisclosure();
  const applicants = post?.applications;
  const handleSubmit = async (applicant) => {
    try {
      await axiosAuth.post(`/client/posts/choose/${post?._id}`, { userId: applicant._id });
      refetch();
      modalDisclosure.hide();
      toaster.success('Freelancer has been choosen!');
      //router.push('/client/jobs');
    } catch (err) {
      toaster.error('Error! Freelancer could not be chosen');
    }
  };

  return (
    <div>
      <div className="flex w-full font-semibold gap-5 items-center bg-gray-100 px-4 py-5 border shadow border-gray-200 mb-5 mt-5">
        Applicants list
      </div>
      {applicants.map((applicant, index) => (
        <div key={index} className="relative flex pl-10 border-b group bg-gray-100 p-2 rounded-lg">
          <div className="flex flex-col w-full gap-4 py-4">
            <div className="px-5 border-b">
              <span className="font-semibold my-4">
                {index + 1}. {applicant.name}
              </span>
            </div>
            <div className="px-5 py-4 bg-white">{applicant.message}</div>

            <div className="flex justify-end px-5">
              {' '}
              <button
                onClick={modalDisclosure.show}
                className=" right-2  bg-green-500 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Select
              </button>
            </div>
          </div>
          <ConfirmFreelancerModal
            isOpen={modalDisclosure.isOpen}
            onClose={modalDisclosure.hide}
            post={post}
            onConfirm={() => {
              handleSubmit(applicant);
            }}
            dataUpdatedAt={dataUpdatedAt}
          />
        </div>
      ))}
    </div>
  );
};
export default ApplicantsList;
