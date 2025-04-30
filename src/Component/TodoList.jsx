import * as React from 'react';
import { useState, useEffect, useContext, useMemo ,useReducer} from 'react';
import { Container, Grid, TextField, Button, Box, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { TodosContext, AlignmentContext } from '../contexts/todosContext';
import ToggleButtons from './ToggleButton';
import Todo from './Todo';
import { useToast } from '../contexts/toastContext';
import todoReducer from '../Reducers/todoReducer';

export default function TodoList() {
  const { todos2, setTodos } = useContext(TodosContext);
  const [todos, dispatch] = useReducer(todoReducer, []);
  const { alignment } = useContext(AlignmentContext);
// const { showHideToast } = useContext(ToastContext);  
  const { showHideToast } = useToast();

  const [inputTodo, setInputTodo] = useState({ title: '', desc: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const completedTodos = useMemo(() => todos.filter((t) => t.isComplete), [todos]);
  const unCompletedTodos = useMemo(() => todos.filter((t) => !t.isComplete), [todos]);

  let todosToBeRendered = todos;
  if (alignment === 'active') todosToBeRendered = unCompletedTodos;
  else if (alignment === 'done') todosToBeRendered = completedTodos;

  function handleAddTodo  ()  {   
    setInputTodo({ title: '', desc: '' });
    showHideToast('Todo added successfully');
    dispatch({type:"added",
        payload:{
        title:inputTodo.title,
        
    }});

  };
  function openDeleteDialog  (todo)  {
    setDialogTodo(todo);
    setIsDialogOpen(true);
  };

  const deleteTodo = () => {
    setIsDialogOpen(false);
    showHideToast('Todo deleted successfully');
    dispatch({type:"deleted",
        payload:{
        id:dialogTodo.id,
        
    }});
  };


  

 
  const openEditDialog = (todo) => {
    setDialogTodo(todo);
    setInputTodo({ title: todo.title, desc: todo.desc });
    setIsEditDialogOpen(true);
  };

  const handleEditTodo = () => {
    setIsEditDialogOpen(false);
    showHideToast('Todo updated successfully');
    dispatch({type:"updated",
        payload:{
        id:dialogTodo.id,
        title:inputTodo.title,
        desc:inputTodo.desc,
        
    }});
  };    
  useEffect(() => {
    dispatch({type:"get",payload:todos});
  }, []);
  const todosJsx = todosToBeRendered.map((todo) => (
    <Todo key={todo.id} todo={todo} showDelete={openDeleteDialog} showEdit={openEditDialog} />
  ));

  return (
    <>
      {/* حوار الحذف */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={deleteTodo}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* الواجهة */}
      <Container maxWidth="sm">
        <Card sx={{ bgcolor: '#2b2b2b', maxHeight: '85vh', overflowY: 'auto', borderRadius: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, pb: 2 }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                Todo List
              </Typography>

              <ToggleButtons />

              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {todosJsx}
              </Box>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="New Todo Title"
                    variant="outlined"
                    value={inputTodo.title}
                    onChange={(e) => setInputTodo({ ...inputTodo, title: e.target.value })}
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

      {/* حوار التعديل */}
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
    </>
  );
}
