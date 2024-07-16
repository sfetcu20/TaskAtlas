import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import NewJobLabel from './NewJobLabel';
import JobsSkillsPills from './JobSkillsPills';
import formatDate from '../../functions/format-date';
import formatCurrency from '../../functions/format-currency';
import JobTypeLabel from './JobTypeLabel';
import { whoami } from '../../functions';

const JobSuccess = ({ post, role, type }) => {
  const router = useRouter();

  const href = useMemo(() => {
    const me = whoami();
    let basePath;

    if (post.status != 'Open' && (post.client == me.me || post.user == me.me)) {
      basePath = `/${me?.role}/job/active/${post._id}`;
    } else basePath = `/${me?.role}/job/${post._id}`;
    return basePath;
  }, [role, type, post?._id]);

  const handleListingClick = useCallback(() => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    router.push(href);
  }, [href, router]);
  let address = `${post?.country}`;
  if (post?.city) address = address + ', ' + post.city;
  if (post?.address) address = address + ', ' + post.address;

  return (
    <div onClick={handleListingClick}>
      <div className="cursor-pointer overflow-hidden sm:rounded-lg sm:shadow">
        <div
          className="flex w-full justify-between items-center bg-gray-100 px-4 border shadow border-gray-200"
          style={{ paddingBottom: '0px', marginBottom: '0px' }}
        >
          <p className="text-xl font-semibold text-job-title line-clamp-2 text-ellipsis">
            {post?.title}
          </p>
          <div className="flex gap-5">
            <JobTypeLabel type={post?.type} />
            <NewJobLabel createdAt={post?.createdAt} />
          </div>
        </div>

        <div className="flex pl-10">
          <div className="pr-10 border-r border-gray-300 py-2">
            {' '}
            <img
              className="h-28 w-32 rounded-full object-cover object-center"
              src={
                post?.cover ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              alt="profile"
            />
          </div>
          <div className="px-4 w-full pl-10">
            <div className="flex justify-between items-center pr-5">
              <p className="text-sm text-gray-600">{address}</p>
              <div className="text-2xl font-semibold text-secondary">
                {formatCurrency(post?.budget)}
              </div>
            </div>
            <div className="flex">
              <JobsSkillsPills post={post} role={role} />
              <p className="font-semibold ml-5">
                {' | '}
                {post?.education || 'No education required'}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-sm text-gray-600">
                <p>
                  Published by <span className="font-semibold">{post?.client?.name}</span>
                </p>
                <p>
                  {' '}
                  | on{' '}
                  <span className="font-semibold">
                    {formatDate(post?.createdAt, 'dd.MM.yyyy')}{' '}
                  </span>
                </p>

                {post?.endDate && (
                  <p>
                    {' '}
                    | expires at{' '}
                    <span className="font-semibold">{formatDate(post?.endDate, 'dd.MM.yyyy')}</span>
                  </p>
                )}
              </div>

              <div
                className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-sm"
                style={{ maxHeight: '50px' }}
              >
                <i className="fa-solid fa-eye text-gray-500"></i>
                <p className="text-gray-500">{post?.times_viewed || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSuccess;
