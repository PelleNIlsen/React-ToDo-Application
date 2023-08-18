import React, { useState } from 'react';

const TodoInput = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder='Add a task...'
                className='p-4 w-full bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md'
                maxLength='50'
            />
        </form>
    )
}

export default TodoInput