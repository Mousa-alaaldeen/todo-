import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import ToggleButtons from './ToggleButton';
import Todo from './Todo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { useContext } from 'react';
export default function TodoList() {
    const { todos, setTodos } = useContext(TodosContext);

    const [inputTodo, setInputTodo] = useState('');

    function handleOnChange(e) {
        setInputTodo(e.target.value);
    }

    function handleAddTodo() {
        if (inputTodo.trim() === '') return;
        const newTodo = {
            id: uuidv4(),
            title: inputTodo,
            desc: '',
            isComplete: false,
        };
        setTodos([...todos, newTodo]);
        setInputTodo('');
    }
    const todoJsx = todos.map((todo) => (
        <Todo key={todo.id} todo={todo} handleOnChange={handleOnChange} />
    ));

    return (
        <Container maxWidth="sm" sx={{ mt: 5, }}>
            <Card sx={{ backgroundColor: '#333333', p: 2 }}>
                <CardContent sx={{ backgroundColor: '#333333' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: 'white' }}>
                            Todo List
                        </Typography>

                        {/* Toggle Button */}
                        <ToggleButtons />
                        {/* ==Toggle Button== */}

                        {/* Todo List */}
                        {todoJsx}
                        {/* ===Todo List== */}

                        {/* Input + Add Button */}
                        <Grid container spacing={2}>
                            <Grid item sm={8}>
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="New Todo"
                                    value={inputTodo}
                                    onChange={handleOnChange}
                                />
                            </Grid>

                            <Grid item sm={4}>
                                <Button
                                    variant="contained"
                                    style={{ height: '100%', width: '100%' }}
                                    onClick={handleAddTodo}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                        {/* ===Input + Add Button== */}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
