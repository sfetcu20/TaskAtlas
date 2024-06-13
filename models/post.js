import * as Yup from 'yup';
import yup from './custom-yup';
const WORK_PREFERENCE_ENUM = {
  remote: 'Remote',
  on_site: 'On-Site',
};
export const validationSchema = Yup.object().shape({
  title: yup
    .string()
    .max(100, 'Title should not be more than 100 letters')
    .required('Title is required'),

  description: yup
    .string()
    .min(75, 'Description should be at least 75 letters')
    .max(500, 'Description should not be more than 500 letters')
    .required('Description is required'),

  country: yup.string().required('Country is required'),

  city: yup.string().when('type', {
    is: 'On-Site',
    then: yup.string().required('City is required for On-Site jobs'),
    otherwise: yup.string().notRequired(),
  }),

  coordinates: yup.object().when('type', {
    is: 'On-Site',
    then: yup.object().shape({
      lat: yup.string().required('Latitude is required for On-Site jobs'),
      lon: yup.string().required('Longitude is required for On-Site jobs'),
    }),

    otherwise: yup.object().notRequired(),
  }),

  address: yup.string().when('type', {
    is: 'On-Site',
    then: yup.string().required('Address is required for On-Site jobs'),
    otherwise: yup.string().notRequired(),
  }),

  type: yup
    .string()
    .oneOf(
      Object.values(WORK_PREFERENCE_ENUM),
      `Type must be one of ${Object.values(WORK_PREFERENCE_ENUM).join(', ')}`
    )
    .required('Type is required'),

  budget: yup.number().required(),

  startDate: yup.string().required(),

  endDate: yup.string().notRequired(),

  skillsRequired: yup.array().of(yup.string()).notRequired(),

  education: yup.string().notRequired(),
});

export const initialValues = {
  title: '',
  skillsRequired: [],
  education: '',
  type: 'Remote',
  coordinates: { lon: '', lat: '' },
  description: '',
  country: '',
  city: '',
  startDate: '',
  endDate: '',
  budget: 0,
  address: '',
};
