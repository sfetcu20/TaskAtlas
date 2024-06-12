import * as Yup from 'yup';
import yup from './custom-yup';
import { stringRequired } from './yup-type-templates';

export const validationSchema = Yup.object().shape({
  name: stringRequired,
  email: yup.string().email('Must be a valid email').required('Email is required'),
  role: stringRequired.oneOf(['user', 'client']),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  city: stringRequired,
  country: stringRequired,
  phoneNumber: yup.string().phoneNumber(),
  skills: yup
    .array()
    .of(yup.string())
    .when('role', {
      is: 'user',
      then: yup
        .array()
        .of(yup.string())
        .required('Skills are required for freelancers')
        .min(1, 'At least one skill is required'),
      otherwise: yup.array().of(yup.string()),
    }),
});

export const initialValues = {
  name: '',
  email: '',
  password: '',
  role: 'user',
  city: '',
  country: '',
  skills: [],
};
