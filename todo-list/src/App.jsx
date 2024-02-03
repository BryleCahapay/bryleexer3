import { useState } from 'react';
import './App.css';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleCreate = () => {
    const newTodoItem = {
      id: todos.length + 1,
      text: newTodo,
      editing: false,
      editText: newTodo, // Add a separate state for editing text
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const handleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, editing: true } : { ...todo, editing: false }
      )
    );
  };

  const handleCancelEdit = () => {
    setTodos(todos.map((todo) => ({ ...todo, editing: false })));
  };

  const handleUpdate = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: todo.editText, editing: false } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleCreate}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.editing ? (
              <>
                <input
                  type="text"
                  value={todo.editText}
                  onChange={(e) =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, editText: e.target.value } : t
                      )
                    )
                  }
                />
                <button onClick={() => handleUpdate(todo.id)}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
