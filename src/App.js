import logo from './logo.svg';
import './App.css';
import TodoList from './Component/TodoList';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
function App() {
  return (
   <>
    <Card sx={{ minWidth: 275, backgroundColor: '#121212', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
   <Container >
   <TodoList />
   </Container>
   </Card>

   </>
  );
}

export default App;
