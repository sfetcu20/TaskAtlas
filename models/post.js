import * as Yup from 'yup';
import yup from './custom-yup';
import { stringOptional, stringRequired } from './yup-type-templates';

export const validationSchema = Yup.object().shape({
  title: stringRequired,
  skillsRequired: yup.array().of(yup.string()),
  education: stringOptional,
});

export const initialValues = {
  title: '',
  skillsRequired: [],
  education: '',
  type: 'Remote',
  coordinates: { lon: '', lat: '' },
};
