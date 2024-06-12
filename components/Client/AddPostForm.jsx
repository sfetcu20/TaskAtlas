import { initialValues, validationSchema } from '../../models/post';
import { Datepicker, Input, Number, Textarea } from '../Fields';
import { Field, Formik } from 'formik';
import { Fieldset, Form, Submit } from '../Formik';
import { addPost } from '../../api/client';
import SkillsMultiselect from '../Forms/SkillsMultiselect';
import { EducationDropdown } from '../Forms';
import CountyDropdown from '../Forms/CountryDropdown';
import { OptionGroup } from '../Identity';
import { postType } from '../../data/post-enums';
import { useState } from 'react';
import FormMap from './FormMap';

const AddPostForm = () => {
  const [showFields, setShowFields] = useState(false);
  const handleSubmit = async (payload) => {
    await addPost(payload);
  };
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form debug={true} className="p-4 ">
          <Fieldset name="title" label="Post title">
            <Field id="title" name="title" as={Input} autoFocus />
          </Fieldset>
          <div className="flex space-x-5">
            <div className="flex-1">
              <Fieldset name="skillsRequired" label="Skills required">
                <Field id="skillsRequired" name="skillsRequired" as={SkillsMultiselect} autoFocus />
              </Fieldset>
            </div>
            <div className="flex-1">
              <Fieldset name="education" label="Education">
                <Field id="education" name="education" as={EducationDropdown} autoFocus />
              </Fieldset>
            </div>
          </div>
          <div className="flex justify-between">
            <Fieldset name="startDate" label="Start date of task">
              <Field id="startDate" name="startDate" as={Datepicker} autoFocus />
            </Fieldset>
            <Fieldset name="endDate" label="End date">
              <Field id="endDate" name="endDate" as={Datepicker} autoFocus />
            </Fieldset>
            <Fieldset name="budget" label="Budget">
              <Field id="budget" name="budget" as={Number} autoFocus />
            </Fieldset>
          </div>
          <div>
            <Fieldset name="description" label="Description">
              <Field id="description" name="description" as={Textarea} autoFocus />
            </Fieldset>
          </div>
          <div className="flex space-x-3">
            <div className="w-half">
              <CountyDropdown label="Country" placeholder="Select the country of origin" required />
            </div>
          </div>
          <div className="px-10">
            <div className="flex-1">
              <Fieldset name="type">
                <Field
                  as={OptionGroup}
                  field="type"
                  label="Task type"
                  options={postType}
                  setShowSkills={setShowFields}
                  required
                />
              </Fieldset>
            </div>
            {showFields && (
              <div>
                <div className="flex space-x-5">
                  <div className="flex-1">
                    <Fieldset name="city" label="City">
                      <Field id="city" name="city" as={Input} autoFocus />
                    </Fieldset>
                  </div>
                  <div className="flex-1">
                    <Fieldset name="address" label="Full address">
                      <Field id="address" name="address" as={Input} autoFocus />
                    </Fieldset>
                  </div>
                </div>
                <FormMap />
              </div>
            )}
          </div>
          <Submit className="button full primary">Send</Submit>
        </Form>
      </Formik>
    </div>
  );
};
export default AddPostForm;