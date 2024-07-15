import { axiosAuth, router, toaster } from '../lib';

export const addPost = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    // If the value is a file, append it to the form data
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === 'object') {
      // If the value is an object, stringify it before appending
      formData.append(key, JSON.stringify(value));
    } else {
      // Otherwise, append the value as is
      formData.append(key, value);
    }
  });
  try {
    await axiosAuth.post(`/client/posts`, formData);
    toaster.success('Post has been created!');
    //router.push('/client/jobs');
  } catch (err) {
    toaster.error('Error! Post could not be created');
  }
};
export const removePost = async (uuid) => {
  try {
    await axiosAuth.delete(`/client/posts/${uuid}`);
    toaster.success('Post has been removed!');
    //router.push('/client/jobs');
  } catch (err) {
    toaster.error('Error! Post could not be removed');
  }
};
export const editPost = async (uuid, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    // If the value is a file, append it to the form data
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === 'object') {
      // If the value is an object, stringify it before appending
      formData.append(key, JSON.stringify(value));
    } else {
      // Otherwise, append the value as is
      formData.append(key, value);
    }
  });
  try {
    await axiosAuth.put(`/client/posts/${uuid}`, formData);
    toaster.success('Post has been edited!');
    //router.push('/client/jobs');
  } catch (err) {
    toaster.error('Error! Post could not be edited');
  }
};
