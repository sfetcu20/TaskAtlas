import { useFormikContext } from 'formik';
import MapComponent from '../MapComponent';
import { useMemo } from 'react';

const FormMap = ({ edit }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleCoordinatesChange = (coords) => {
    setFieldValue('coordinates', { lon: coords[0].toString(), lat: coords[1].toString() });
  };
  const defaultCoordinates = useMemo(() => {
    if (edit) {
      return [parseFloat(values.coordinates.lon), parseFloat(values.coordinates.lat)];
    }
    return null;
  }, [edit, values.coordinates]);

  return (
    <div className="grid">
      <span className="form-label relative mb-1 w-full cursor-pointer">Hartă</span>
      <MapComponent
        county={values.county}
        city={values.city}
        coordinates={defaultCoordinates}
        onCoordinatesChange={handleCoordinatesChange}
      />
    </div>
  );
};

export default FormMap;
