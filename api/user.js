import { axiosAuth, toaster } from '../lib';

export const applyForJob = async (data) => {
  try {
    await axiosAuth.post(`/user/posts/apply/${data._id}`, data);
    toaster.success('Application has been registered!');
    //router.push('/client/jobs');
  } catch (err) {
    toaster.error('Error! Application could not be registered');
  }
};
