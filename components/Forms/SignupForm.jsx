import { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Email, Input, Password, Recaptcha } from '../Fields';
import { Fieldset, Submit } from '../Formik';
import { validationSchema, initialValues } from '../../models/signup';
import { signup } from '../../api';
import { OptionGroup } from '../Identity';
import { IDENTITY_TYPES } from '../../constants/identity';
import CountyDropdown from './CountryDropdown';
import SkillsMultiselect from './SkillsMultiselect';

const SignupForm = () => {
  const ref = useRef(null);
  const [showSkills, setShowSkills] = useState(true);
  const handleSubmit = async (values) => {
    await signup(ref, values);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div className="flex gap-5">
          <div className="py-5 flex flex-col gap-2">
            <Fieldset name="name" label="Your name">
              <Field id="name" name="name" as={Input} autoFocus />
            </Fieldset>

            <Fieldset name="email" label="Your email">
              <Field id="email" name="email" as={Email} />
            </Fieldset>

            <Fieldset name="password" label="Your password">
              <Field id="password" name="password" as={Password} />
            </Fieldset>
            <Fieldset name="phoneNumber" label="Your phone number">
              <Field id="phoneNumber" name="phoneNumber" as={Input} />
            </Fieldset>
          </div>
          <div className="flex flex-col p-5">
            <div className="px-10">
              <Fieldset name="role">
                <Field
                  as={OptionGroup}
                  field="role"
                  label="Your account type"
                  setShowSkills={setShowSkills}
                  options={IDENTITY_TYPES}
                  required
                />
              </Fieldset>
            </div>

            <div>
              <div className="flex  gap-2">
                <CountyDropdown label="Country" placeholder="Select your country" required />
                <Fieldset name="city" label="Your city">
                  <Field id="city" name="city" as={Input} autoFocus />
                </Fieldset>
              </div>
            </div>
            <div className="w-full py-2">
              {showSkills && (
                <Fieldset name="skills" label="Your skills">
                  <Field
                    id="skills"
                    name="skills"
                    as={SkillsMultiselect}
                    autoFocus
                    field={'skills'}
                  />
                </Fieldset>
              )}
            </div>
          </div>
        </div>
        <Submit className="button full primary">Signup</Submit>
        <Recaptcha ref={ref} />
      </Form>
    </Formik>
  );
};

export default SignupForm;
