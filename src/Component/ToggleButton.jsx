import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { AlignmentContext } from '../contexts/todosContext';

export default function ColorToggleButton() {
  const { alignment, setAlignment } = useContext(AlignmentContext);

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={(e, newAlignment) => newAlignment && setAlignment(newAlignment)}
      aria-label="Filter Todos"
      sx={{ bgcolor: '#424242', borderRadius: 2 }}
    >
      <ToggleButton value="all" sx={{ color: 'white' }}>All</ToggleButton>
      <ToggleButton value="active" sx={{ color: 'white' }}>Active</ToggleButton>
      <ToggleButton value="done" sx={{ color: 'white' }}>Done</ToggleButton>
    </ToggleButtonGroup>
  );
}
