const FILTER_DEFAULT_VALUES = {
  per_page: 30,
  search: '',
  skillsRequired: [],
  startDate: '',
  endDate: '',
};

const updateQuery = (field, value, initialValues, defaultValue) => {
  const query = { ...initialValues };

  const effectiveDefaultValue = defaultValue ?? FILTER_DEFAULT_VALUES[field];
  if (value === effectiveDefaultValue) {
    delete query[field];
  } else {
    query[field] = value;
  }

  return query;
};

export default updateQuery;
