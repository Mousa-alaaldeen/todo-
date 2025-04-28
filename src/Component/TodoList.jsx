import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container, Grid, TextField, Button } from '@mui/material';
import ToggleButtons from './ToggleButton';
import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useContext } from 'react';
import { TodosContext, AlignmentContext } from '../contexts/todosContext';

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const { alignment } = useContext(AlignmentContext);
  const [inputTodo, setInputTodo] = useState('');

  const completedTodos = todos.filter((t) => t.isComplete);
  const unCompletedTodos = todos.filter((t) => !t.isComplete);

  let todosToBeRendered = todos;
  if (alignment === 'active') todosToBeRendered = unCompletedTodos;
  else if (alignment === 'done') todosToBeRendered = completedTodos;

  const handleAddTodo = () => {
    if (inputTodo.trim() === '') return;
    const newTodo = {
      id: uuidv4(),
      title: inputTodo,
      desc: '',
      isComplete: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setInputTodo('');
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    setTodos(storedTodos || []);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ bgcolor: '#2b2b2b', maxHeight: '85vh', overflowY: 'auto', borderRadius: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              pb: 2,
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              Todo List
            </Typography>

            <ToggleButtons />

            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {todosToBeRendered.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="New Todo"
                  variant="outlined"
                  value={inputTodo}
                  onChange={(e) => setInputTodo(e.target.value)}
                  sx={{ bgcolor: 'white', borderRadius: 1 }}
                />
              </Grid>

              <Grid item xs={4}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleAddTodo}
                  sx={{ height: '100%', bgcolor: '#00bcd4', '&:hover': { bgcolor: '#0097a7' } }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
