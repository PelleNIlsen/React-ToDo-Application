import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
        todos,
        toggleComplete,
        deleteTodo,
        updateNotes,
        addComment,
        editComment,
        deleteComment,
        tags,
        addTagToTodo
    }) => {
    const unfinishedTodos = todos.filter(todo => !todo.completed);
    const finishedTodos = todos.filter(todo => todo.completed);

    return (
        <div className='mt-4'>
            <h2 className='mt-8 text-lg font-bold text-gray-600 dark:text-gray-300'>To-do</h2>
            {unfinishedTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={() => toggleComplete(todo.id)}
                    deleteTodo={() => deleteTodo(todo.id)}
                    updateNotes={updateNotes}
                    addComment={addComment}
                    editComment={editComment}
                    deleteComment={deleteComment}
                    tags={tags}
                    addTagToTodo={addTagToTodo}
                />
            ))}

            {finishedTodos.length > 0 && (
                <>
                    <h2 className='mt-8 text-lg font-bold text-gray-600 dark:text-gray-300'>Finished Tasks</h2>
                    {finishedTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleComplete={() => toggleComplete(todo.id)}
                            deleteTodo={() => deleteTodo(todo.id)}
                            updateNotes={updateNotes}
                            addComment={addComment}
                            editComment={editComment}
                            deleteComment={deleteComment}
                            tags={tags}
                            addTagToTodo={addTagToTodo}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default TodoList