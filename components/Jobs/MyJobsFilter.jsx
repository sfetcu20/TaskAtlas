import { Field } from 'formik';
import { Datepicker, Dropdown, Fieldset, Submit } from '../Formik';
import Search from '../Formik/Search';
import FiltersForm from '../Filters/FiltersForm';
import { SkillsMultiselect } from '../Forms';
import { Button } from 'react-bootstrap';

const MyJobsFilters = ({ options, setOptions }) => {
  const statuses = ['Open', 'In progress', 'Complete'];
  const initialValues = {
    ...options,
    search: '',
    skillsRequired: [],
    startDate: '',
    endDate: '',
    status: '',
  };

  return (
    <FiltersForm initialValues={initialValues} setOptions={setOptions}>
      <div className="rounded-xl border-b border-t bg-gray-100 mb-8 pb-5">
        <div className="flex flex-wrap items-center justify-between py-4 text-sm px-2">
          <Fieldset label="Search job title" name="search" className="flex-grow">
            <Field as={Search} id="search" name="search" placeholder="" min="3" />
          </Fieldset>

          <div className="flex flex-wrap gap-4">
            <Fieldset name="startDate" label="Start date of task" className="w-40">
              <Field id="startDate" name="startDate" as={Datepicker} field="startDate" />
            </Fieldset>
            <Fieldset name="endDate" label="End date" className="w-40">
              <Field id="endDate" name="endDate" as={Datepicker} field="endDate" />
            </Fieldset>
            <Fieldset name="status" label="Status" className="w-40">
              <Field id="status" name="status" as={Dropdown} field="status">
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Field>
            </Fieldset>
            <Fieldset name="skillsRequired" label="Skills required" className="w-60">
              <Field id="skillsRequired" name="skillsRequired" as={SkillsMultiselect} autoFocus />
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

export default MyJobsFilters;
