import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextareaAutosize } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextarea.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextarea({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextareaAutosize
          {...field}
          minRows={2}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          {...other}
        />
      )}
    />
  );
}