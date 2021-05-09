import './app.css';
import React, { useCallback, useState, useRef } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      //{type:'Insert', todo:{id:1,text:'todo',checked:false}}
      return todos.concat(action.todo);
    case 'REMOVE':
      //{type:'REMOVE',id:1}
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  //const [todos,dispatch]=useReducer(todoReduer,undefined,createBulkTodos);
  const [todos, setTodos] = useState(createBulkTodos);

  const nextId = useRef(2501);
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    //dispatch({type:'INSERT',todo});
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);
  const onRemove = useCallback((id) => {
    //dispatch({type:'REMOVE',id});
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);
  const onToggle = useCallback((id) => {
    //dispatch({type:'TOGGLE',id});

    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList onToggle={onToggle} onRemove={onRemove} todos={todos} />
    </TodoTemplate>
  );
};

export default App;
