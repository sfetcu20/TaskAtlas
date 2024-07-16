import React from 'react';
import { Field } from 'formik';
import { Datepicker, Dropdown, Fieldset, Submit } from '../Formik';
import Search from '../Formik/Search';
import FiltersForm from '../Filters/FiltersForm';
import { SkillsMultiselect } from '../Forms';
import CountyDropdown from '../Forms/CountryDropdown';
import ClearFilters from './ClearFilters';
import CountryMultiselect from '../Forms/CountryMultiselect';

const MyJobsFilters = ({ options, setOptions, setFiltersUpdated }) => {
  const statuses = ['Open', 'In progress', 'In review', 'Complete'];
  const types = ['Remote', 'On-Site'];
  const initialValues = {
    ...options,
    search: '',
    skillsRequired: [],
    startDate: '',
    endDate: '',
    status: '',
    country: [],
    type: '',
  };

  return (
    <FiltersForm initialValues={initialValues} setOptions={setOptions}>
      <div className="rounded-xl border-b border-t bg-gray-100 mb-8 py-5">
        <div className="flex flex-col items-center justify-between  text-sm px-2">
          <div className="flex w-full px-10 gap-10">
            <div className="flex-1">
              <Fieldset label="Search job title" name="search" className="flex-grow">
                <Field as={Search} id="search" name="search" placeholder="" min="3" />
              </Fieldset>
            </div>
            <div className="flex-1">
              <Fieldset name="skillsRequired" label="Skills required" className="w-60">
                <Field id="skillsRequired" name="skillsRequired" as={SkillsMultiselect} autoFocus />
              </Fieldset>
            </div>
          </div>

          <div className="flex w-full justify-between gap-4 px-10 ">
            <Fieldset name="startDate" label="Start date of task" className="w-40">
              <Field id="startDate" name="startDate" as={Datepicker} field="startDate" />
            </Fieldset>
            <Fieldset name="endDate" label="End date" className="w-40">
              <Field id="endDate" name="endDate" as={Datepicker} field="endDate" />
            </Fieldset>
            <Fieldset name="status" label="Status" className="w-40">
              <Field id="status" name="status" as={Dropdown} field="status">
                <option key={'All'} value="">
                  All
                </option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Field>
            </Fieldset>
          </div>
          <div className="flex w-full px-10 gap-10">
            <div className="flex-1">
              <Fieldset name="type" label="Job type" className="w-40">
                <Field id="type" name="type" as={Dropdown} field="type">
                  <option key={''} value="">
                    All
                  </option>
                  {types.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Field>
              </Fieldset>
            </div>
            <div className="flex-1">
              <Fieldset name="country" label="Country">
                <Field id="country" name="country" as={CountryMultiselect}></Field>
              </Fieldset>
            </div>
          </div>
        </div>
        <div className="flex justify-end px-10 gap-5 ">
          <ClearFilters
            setOptions={setOptions}
            initialValues={initialValues}
            setFiltersUpdated={setFiltersUpdated}
          />
          <Submit className="button mini primary">Filter</Submit>
        </div>
      </div>
    </FiltersForm>
  );
};

export default MyJobsFilters;
