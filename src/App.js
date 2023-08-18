import React, { useState } from 'react';
import './App.css';
import TodoInput from './components/Todo/TodoInput';
import TodoList from './components/Todo/TodoList';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [newTag, setNewTag] = useState('');
  const [theme, setTheme] = useState('light');

  const filteredTodos = selectedTag ? todos.filter(todo => todo.tags.includes(selectedTag)) : todos;

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      notes: '',
      comments: [],
      tags: []
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed } : todo  
      ).sort((a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodoNotes = (id, notes) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? {...todo, notes: notes } : todo  
      )
    )
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }

  const downloadTasks = () => {
    const fileData = JSON.stringify({ tasks: todos, tags: tags });
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'tasks.json';
    link.href = url;
    link.click();
  }

  const uploadTasks = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setTodos(data.tasks || []);
      setTags(data.tags || []);
    };
    
    reader.readAsText(file);
  };

  const addComment = (todoId, commentText) => {
    const newComment = { id: Date.now(), text: commentText };
    setTodos(
      todos.map(todo =>
        todo.id === todoId ? {...todo, comments: [...todo.comments, newComment] } : todo
      )
    );
  };

  const editComment = (todoId, commentId, newText) => {
      setTodos(
        todos.map(todo =>
          todo.id === todoId ? {
            ...todo,
            comments: todo.comments.map(comment =>
              comment.id === commentId ? {...comment, text: newText} : comment
            )
          } : todo
        )
      );
  };

  const deleteComment = (todoId, commentId) => {
    setTodos(
      todos.map(todo =>
        todo.id === todoId ? {
          ...todo,
          comments: todo.comments.filter(comment => comment.id !== commentId)
        } : todo
      )
    );
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags(prev => [...prev, newTag]);
      setNewTag('');
    }
  };

  const addTagToTodo = (todoId, tagOrTags) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }
  
        if (Array.isArray(tagOrTags)) {
          return { ...todo, tags: tagOrTags };
        } else {
          return { ...todo, tags: [...todo.tags, tagOrTags] };
        }
      });
    });
  };

  const deleteTag = (tagToDelete) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToDelete));
  
    const updatedTodos = todos.map(todo => ({
      ...todo,
      tags: todo.tags.filter(tag => tag !== tagToDelete)
    }));
  
    setTodos(updatedTodos);
  };  

  React.useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedTags = localStorage.getItem('tags');

    if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
    }

    if (storedTags) {
        setTags(JSON.parse(storedTags));
    }
  }, []);

  React.useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  React.useEffect(() => {
    if (tags.length > 0) {
        localStorage.setItem('tags', JSON.stringify(tags));
    }
  }, [tags]);

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-800 p-8'>
      <ThemeToggle toggleTheme={toggleTheme} currentTheme={theme} />
      <button onClick={downloadTasks} className='p-2 bg-blue-500 text-white rounded-md m-2'>Save Tasks to File</button>
      <input type='file' onChange={uploadTasks} className='m-2 dark:text-white' accept='.json' />

      <div className='my-4 flex items-center space-x-4'>
        <input
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
          placeholder="Create new tag"
          className='p-2 rounded border shadow-sm dark:bg-gray-700 dark:text-white'
          maxLength='20'
        />
        <button onClick={addTag} className='p-2 bg-green-500 text-white rounded-md shadow-md'>Add Tag</button>
      </div>

      <div className='my-4'>
        <span className='text-gray-700 dark:text-white mr-4'>Filter by tag:</span>
        {tags.map(tag => (
          <div key={tag} className='inline-flex items-center space-x-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-md mr-2 shadow-sm px-2'>
            <button
              onClick={() => setSelectedTag(tag)}
              className={`p-2 rounded-md ${tag === selectedTag ? 'bg-blue-500 text-white' : ''}`}
            >
              {tag}
            </button>
            <button onClick={() => deleteTag(tag)} className="text-red-500 hover:text-red-600">x</button>
          </div>
        ))}
        <button onClick={() => setSelectedTag('')} className='p-2 bg-red-500 text-white rounded-md shadow-sm'>Clear Filter</button>
      </div>

      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        updateNotes={updateTodoNotes}
        addComment={addComment}
        editComment={editComment}
        deleteComment={deleteComment}
        tags={tags}
        addTagToTodo={addTagToTodo}
      />
    </div>
  );
}

export default App;
