import { v4 as uuidv4 } from 'uuid';
export default function todoReducer(currentTodos, action) {
    switch (action.type) {
        case 'added':
            {
                if (action.payload.title.trim() === '')
                    return;

                const newTodo = {
                    id: uuidv4(),
                    title: action.payload.title,
                    desc: '',
                    isComplete: false,
                };

                const updatedTodos = [...currentTodos, newTodo];
                localStorage.setItem('todos', JSON.stringify(updatedTodos));
                return updatedTodos;

            }
        case 'deleted': {
            const updatedTodos = currentTodos.filter((t) => t.id !== action.payload.id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;

        }
        case 'updated': {
             const updatedTodos = currentTodos.map((t) => {
            if (t.id === action.payload.id) {
              return { ...t, title: action.payload.title, desc: action.payload.desc };  
            }
            return t;
          });
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
          return updatedTodos;
          
        }
        case 'get': {
            const storedTodos = JSON.parse(localStorage.getItem('todos'));
            return storedTodos;
        }
        default:
            {
                throw new Error('Unknown action: ' + action.type);
            }
    }

    return [];
}