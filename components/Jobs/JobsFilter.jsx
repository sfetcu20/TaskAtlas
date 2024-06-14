import { Field } from 'formik';
import { Datepicker, Fieldset, Submit } from '../Formik';
import Search from '../Formik/Search';
import FiltersForm from '../Filters/FiltersForm';
import { SkillsMultiselect } from '../Forms';
import { Button } from 'react-bootstrap';

const JobsFilters = ({ options, setOptions }) => {
  const initialValues = {
    ...options,
    search: '',
    skillsRequired: [],
    startDate: '',
    endDate: '',
  };
  return (
    <FiltersForm initialValues={initialValues} setOptions={setOptions}>
      <div className="rounded-xl border-b border-t bg-gray-100 mb-8 pb-5">
        <div className="flex items-center justify-between  py-4 text-sm  px-2 ">
          <Fieldset label="Search job title" name="search">
            <Field as={Search} id="search" name="search" placeholder="" min="3" />
          </Fieldset>
          <div className="w-1/4">
            <Fieldset name="skillsRequired" label="Skills required">
              <Field id="skillsRequired" name="skillsRequired" as={SkillsMultiselect} autoFocus />
            </Fieldset>
          </div>
          <div className="flex gap-1">
            <Fieldset name="startDate" label="Start date of task">
              <Field id="startDate" name="startDate" as={Datepicker} field="startDate" />
            </Fieldset>
            <Fieldset name="endDate" label="End date">
              <Field id="endDate" name="endDate" as={Datepicker} field="endDate" />
            </Fieldset>
          </div>
        </div>
        <div className="flex justify-end px-2 gap-5">
          <Button onClick={() => setOptions(initialValues)} className="button mini secondary">
            Clear
          </Button>
          <Submit className="button mini primary">Filter</Submit>
        </div>
      </div>
    </FiltersForm>
  );
};
export default JobsFilters;
