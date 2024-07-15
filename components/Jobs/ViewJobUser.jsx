import { removeDuplicates, whoami } from '../../functions';
import formatCurrency from '../../functions/format-currency';
import formatDate from '../../functions/format-date';
import JobsSkillsPills from './JobSkillsPills';
import JobStatusPill from './JobStatusPill';
import JobTypeLabel from './JobTypeLabel';
import NewJobLabel from './NewJobLabel';
import Button from '../../components/Button';

import { useDisclosure } from '../../hooks';

import ApplyModal from '../ApplyModal';

const ApplyForJobModal = ({ isOpen, onClose, onConfirm, post, refetch, dataUpdatedAt }) => {
  return (
    <ApplyModal
      goBackText="Back"
      green={true}
      hide={onClose}
      iAmSure={onConfirm}
      isOpen={isOpen}
      title="Remove Post"
      post={post}
      refetch={refetch}
      dataUpdatedAt={dataUpdatedAt}
    ></ApplyModal>
  );
};
function findElementById(array, id) {
  return array.filter((element) => element._id === id);
}

const ViewJobUser = ({ post, refetch, dataUpdatedAt }) => {
  const me = whoami();

  const modalDisclosure = useDisclosure();
  const userApplied = findElementById(post?.applications, me.me)[0];

  let address = `${post?.country}`;
  if (post?.city) address = address + ', ' + post.city;
  if (post?.address) address = address + ', ' + post.address;
  address = removeDuplicates(address);
  return (
    <div className="">
      <div
        className="flex w-full justify-between items-center bg-gray-100 px-4 py-5 border shadow border-gray-200"
        style={{ paddingBottom: '0px', marginBottom: '0px' }}
      >
        <p className="text-xl font-semibold text-job-title line-clamp-2 text-ellipsis">
          {post?.title}
        </p>
        <div className="flex gap-5">
          <JobTypeLabel type={post?.type} />
          <JobStatusPill status={post?.status} />
          <NewJobLabel createdAt={post?.createdAt} />
        </div>
      </div>
      <div className="flex p-5 text-base gap-20 border-b">
        <span className="text-gray-800">Start Date: {formatDate(post?.startDate)}</span>
        <span className="text-gray-800">
          End Date:{formatDate(post?.endDate) || 'No end date'}{' '}
        </span>
      </div>
      <div className="flex justify-between items-center p-5 border-b">
        <p className="text-base text-gray-800">{address}</p>
        <div className="text-2xl font-semibold text-secondary">{formatCurrency(post?.budget)}</div>
      </div>
      <div className="flex p-5 border-b">
        <JobsSkillsPills post={post} maxPills={100} />
        <p className="font-semibold ml-5">
          {' | '}
          {post?.education || 'No education required'}
        </p>
      </div>
      <div className="flex w-full justify-between items-center bg-gray-100 px-4 py-5 border shadow border-gray-200 mb-5 mt-5">
        <p className="text-lg font-semibold text-job-title line-clamp-2 text-ellipsis text-gray-700">
          Full Description
        </p>
      </div>
      <div className="p-5 flex bg-gray-100 border-t">
        <div className="flex-1 bg-white p-5">{post?.description}</div>
        <div className="flex-1 p-3">
          <img src={post?.cover} />
        </div>
      </div>

      <div className="flex w-full justify-between items-center bg-gray-100 px-4 py-5 border shadow border-gray-200 mb-5 mt-5">
        <p className="text-lg font-semibold text-job-title line-clamp-2 text-ellipsis text-gray-700">
          Client
        </p>
      </div>
      <div className="flex pl-10 border-b ">
        <div className="pr-10 border-r border-gray-300 py-2">
          {' '}
          <img
            className="h-28 w-32 rounded-full object-cover object-center"
            src={
              post?.client?.avatar ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            alt="profile"
          />
        </div>
        <div className="flex flex-col">
          <div className="px-5">
            Name: <span className="font-semibold">{post?.client?.name}</span>
          </div>
          <div className="px-5 py-2">
            Contact: <span className="font-semibold">{post?.client?.email}</span>
          </div>
          <div className="px-5">
            Jobs Posted: <span className="font-semibold">{post?.client?.jobsPosted.length}</span>
          </div>
        </div>
      </div>

      {!userApplied && (
        <div>
          <div className="flex w-full justify-end gap-5 items-center bg-gray-100 px-4 py-5 border shadow border-gray-200 mb-5 mt-5">
            <Button className="button full primary" onClick={modalDisclosure.show}>
              Apply
            </Button>
          </div>
          <ApplyForJobModal
            isOpen={modalDisclosure.isOpen}
            onClose={modalDisclosure.hide}
            post={post}
            refetch={refetch}
            dataUpdatedAt={dataUpdatedAt}
          />
        </div>
      )}
      {userApplied && (
        <div className="flex w-full justify-end gap-5 items-center bg-gray-100 px-4 py-5 border shadow border-gray-200 mb-5 mt-5">
          <div
            className="button full lightTeal flex items-center gap-2"
            onClick={modalDisclosure.show}
          >
            <p>Applied</p>
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
      )}
      {userApplied && (
        <div className="shadow bg-gray-50">
          <div className="flex w-full  gap-5 font-semibold items-center bg-gray-100 px-4 py-5 border shadow border-gray-200 mb-5 mt-5">
            Your application
          </div>
          <div className="flex pl-10 border-b ">
            <div className="flex flex-col">
              <div className="px-5 border-b">
                <span className="font-semibold">{userApplied?.name}</span>
              </div>
              <div className="px-5 py-10">{userApplied?.message}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewJobUser;
