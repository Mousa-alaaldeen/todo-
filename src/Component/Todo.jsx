import * as React from 'react';
import { useState, useContext } from 'react';
import { Card, CardContent, Grid, IconButton, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Delete as DeleteIcon, Check as CheckIcon, Edit as EditIcon } from '@mui/icons-material';
import { TodosContext } from '../contexts/todosContext';
import { useToast } from '../contexts/toastContext';

export default function Todo({ todo, showDelete,showEdit }) {
  const { todos, setTodos } = useContext(TodosContext);
// const { showHideToast } = useContext(ToastContext);
  const { showHideToast } = useToast();

  const [inputTodo, setInputTodo] = useState({ title: todo.title, desc: todo.desc });


  // تغيير حالة الإنجاز للمهمة
  const toggleTodoComplete = () => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isComplete: !t.isComplete };
      } else {
        return t;
      }
    });

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    showHideToast('Todo updated successfully');
  };

  // فتح حوار الحذف
  const openDeleteDialog = () => {
    showDelete(todo);
  };

  // فتح حوار التعديل
  function openEditDialog  () {
    showEdit(todo);
   
  };


  return (
    <>
      {/* كارت المهمة */}
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
                {/* زر إنجاز المهمة */}
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

                {/* زر تعديل المهمة */}
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

                {/* زر حذف المهمة */}
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
