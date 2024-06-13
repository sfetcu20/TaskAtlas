import { useFormikContext } from 'formik';
import { classnames } from '../../lib';

const OptionGroup = ({ field, label, onSelect, setShowSkills, options, required }) => {
  const { setFieldValue, values } = useFormikContext();

  // If no custom onSelect is provided, use the default functionality
  const handleSelect =
    onSelect ||
    ((option) => {
      if (option !== values[field]) {
        setFieldValue(field, option);
        if (typeof setShowSkills == 'function') {
          setShowSkills((prev) => {
            return !prev;
          });
        }
      }
    });

  return (
    <div className="option-group">
      <label className={classnames('option-label', required && 'required')}>{label}</label>
      <div className="options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`option ${values[field] === option.value ? 'selected' : ''} ${
              option.icon ? 'flex-col px-2 py-4' : 'p-2 text-left'
            }`}
            onClick={() => handleSelect(option.value)}
          >
            {option.icon && (
              <i
                className={`${option.icon} icon mb-2 mr-1 text-2xl ${
                  values[field] === option.value ? 'selected' : ''
                }`}
              />
            )}
            <p>{option?.label ?? option?.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionGroup;
