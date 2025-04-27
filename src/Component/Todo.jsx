import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TodosContext } from '../contexts/todosContext';
import { useContext, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleTodoComplete = () => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  const openDeleteDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  const deleteTodo = () => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    setIsDialogOpen(false);
  };
  


  return (
    <>
      {/* Dialog for Confirm Deletion */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={closeDeleteDialog}>
            Cancel
          </Button>
          <Button color="primary" autoFocus onClick={deleteTodo}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Todo Card */}
      <Card className="todoCard" sx={{ minWidth: 275, backgroundColor: '#2c2c2c', borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                {todo.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#cccccc' }}>
                {todo.desc}
              </Typography>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={1}>
                <IconButton
                  className="iconButton"
                  aria-label="check"
                  sx={{
                    color: todo.isComplete ? '#eeeeee' : '#00e676',
                    border: '1px solid #00e676',
                    backgroundColor: todo.isComplete ? '#424242' : '#2c2c2c',
                  }}
                  onClick={toggleTodoComplete}
                >
                  <CheckIcon />
                </IconButton>

                <IconButton
                  className="iconButton"
                  aria-label="edit"
                  sx={{ color: '#2979ff', border: '1px solid #2979ff' }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  sx={{ color: '#ff1744', border: '1px solid #ff1744' }}
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
