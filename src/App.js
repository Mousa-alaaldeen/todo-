import logo from './logo.svg';
import './App.css';
import TodoList from './Component/TodoList';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TodosContext,AlignmentContext } from './contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
const initialTodos = [
  {
    id: uuidv4(),
    title: 'Todo 1',
    desc: 'Todo 1 Description',
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: 'Todo 2',
    desc: 'Todo 2 Description nsd,hk ksnlgijns jilashfn',
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: 'Todo 3',
    desc: 'Todo 3 Description',
    isComplete: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [alignment, setAlignment] = useState('all'); 

  return (
    <>
      <Card sx={{ minWidth: 275, backgroundColor: '#121212', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Container>
          <TodosContext.Provider value={{ todos, setTodos }}>
            <AlignmentContext.Provider value={{ alignment, setAlignment }}>
              <TodoList />
            </AlignmentContext.Provider>
          </TodosContext.Provider>
        </Container>
      </Card>
    </>
  );
}


export default App;
