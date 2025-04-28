import * as React from 'react';
import { Card, CardContent, Grid, IconButton, Stack, Typography, Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Delete as DeleteIcon, Check as CheckIcon, Edit as EditIcon } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/todosContext';

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputTodo, setInputTodo] = useState({ title: todo.title, desc: todo.desc });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const toggleTodoComplete = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isComplete: !t.isComplete } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = () => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setIsDialogOpen(false);
  };

  const handleEditTodo = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, title: inputTodo.title, desc: inputTodo.desc } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setIsEditDialogOpen(false);
  };

  const openDeleteDialog = () => setIsDialogOpen(true);
  const openEditDialog = () => setIsEditDialogOpen(true);

  return (
    <>
      {/* Delete Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={deleteTodo}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            variant="standard"
            value={inputTodo.title}
            onChange={(e) => setInputTodo({ ...inputTodo, title: e.target.value })}
          />
          <TextField
            label="Description"
            variant="standard"
            value={inputTodo.desc}
            onChange={(e) => setInputTodo({ ...inputTodo, desc: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditTodo}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Todo Card */}
      <Card sx={{ bgcolor: '#424242', borderRadius: 2, mb: 2 }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={8}>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  textDecoration: todo.isComplete ? 'line-through' : 'none',
                  wordBreak: 'break-word',
                  textDecoration: todo.isComplete ? 'line-through' : 'none'
                }}
              >
                {todo.title}
              </Typography>
              {todo.desc && (
                <Typography
                  variant="body2"
                  sx={{ color: '#bdbdbd', mt: 1, wordBreak: 'break-word' }}
                >
                  {todo.desc}
                </Typography>
              )}
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="complete"
                  sx={{
                    color: todo.isComplete ? '#eeeeee' : '#00e676',
                    border: '1px solid #00e676',
                    backgroundColor: todo.isComplete ? '#00e676' : '#2c2c2c',
                    '&:hover': { backgroundColor: '#00c853', color: 'white' }
                  }}
                  onClick={toggleTodoComplete}
                >
                  <CheckIcon />
                </IconButton>

                <IconButton
                  aria-label="edit"
                  sx={{
                    color: '#2979ff',
                    border: '1px solid #2979ff',
                    backgroundColor: '#2c2c2c',
                    '&:hover': { backgroundColor: '#1565c0', color: 'white' }
                  }}
                  onClick={openEditDialog}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  sx={{
                    color: '#ff1744',
                    border: '1px solid #ff1744',
                    backgroundColor: '#2c2c2c',
                    '&:hover': { backgroundColor: '#d50000', color: 'white' }
                  }}
                  onClick={openDeleteDialog}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
