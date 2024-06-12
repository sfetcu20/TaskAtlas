import { axiosAuth, router, toaster } from '../lib';

export const addPost = async (data) => {
  try {
    await axiosAuth.post(`/client/posts`, data);
    toaster.success('Post has been created!');
    //router.push('/client/jobs');
  } catch (err) {
    toaster.error('Error! Post could not be created');
  }
};
