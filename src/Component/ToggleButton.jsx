import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('web');

  //   const handleChange = (
  //     event: React.MouseEvent<HTMLElement>,
  //     newAlignment: string,
  //   ) => {
  //     setAlignment(newAlignment);
  //   };

  return (
    <ToggleButtonGroup
      color="primary"
      //   value={alignment}
      exclusive
      //   onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton sx={{ backgroundColor: '#3f51b5', color: 'white', '&:hover': { backgroundColor: '#303f9f' } }}>Todo</ToggleButton>
      <ToggleButton sx={{ backgroundColor: '#0288d1', color: 'white', '&:hover': { backgroundColor: '#0277bd' } }}>Doing</ToggleButton>
      <ToggleButton sx={{ backgroundColor: '#388e3c', color: 'white', '&:hover': { backgroundColor: '#2e7d32' } }}>Done</ToggleButton>


    </ToggleButtonGroup>
  );
}