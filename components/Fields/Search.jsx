import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { classnames } from '../../lib';

const Search = ({ className, initialValue, placeholder, setSearch }) => {
  const ref = useRef(null);

  const request = debounce((value) => {
    if (typeof setSearch === 'function') {
      setSearch(value);
    }
  }, 500);
  const debounceRequest = useCallback((value) => request(value), [request]);

  const handleChange = (event) => {
    return debounceRequest(event.target.value);
  };

  const handleKeyUp = (event) => {
    event.keyCode === 13 && ref.current.blur();
  };

  const resetInputValue = () => {
    ref.current.value = '';
    if (typeof setSearch === 'function') {
      setSearch('');
    }
  };

  useEffect(() => {
    ref.current.value = initialValue || '';
  }, [initialValue]);

  return (
    <div className={classnames('relative flex items-center', className)}>
      <input
        className="input pl-9"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        ref={ref}
        type="text"
      />
      <div className="absolute left-2 px-1">
        <i className="fas fa-search text-gray-500"></i>
      </div>
      {ref.current?.value && (
        <button
          className="absolute right-0 top-0 z-30 h-full px-3 py-2 text-gray-500 outline-none"
          onClick={resetInputValue}
          tabIndex="-1"
          type="button"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
};

export default Search;
