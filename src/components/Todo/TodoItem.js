import React, { useState } from 'react';

const TodoItem = ({
        todo,
        toggleComplete,
        deleteTodo,
        updateNotes,
        addComment,
        editComment,
        deleteComment,
        tags,
        addTagToTodo
    }) => {
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState(todo.notes);
    const [newComment, setNewComment] = useState('');
    const [editedComments, setEditedComments] = useState({});

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleCommentChange = (id, text) => {
        setEditedComments({
            ...editedComments,
            [id]: text,
        });
    };

    const handleNotesSave = () => {
        updateNotes(todo.id, notes);
        setShowNotes(false);
    }

    const handleAddComment = () => {
        addComment(todo.id, newComment);
        setNewComment('');
    };

    const handleEditComment = (commentId) => {
        if (editedComments[commentId]) {
            editComment(todo.id, commentId, editedComments[commentId]);
        }
    };

    const handleAddTagToTodo = (e) => {
        if (e.key === "Enter" && tags.includes(e.target.value)) {
            addTagToTodo(todo.id, e.target.value);
            e.target.value = '';
        }
    };

    const removeTagFromTodo = (tagToRemove) => {
        const updatedTags = todo.tags.filter(tag => tag !== tagToRemove);
        addTagToTodo(todo.id, updatedTags);
    };      

    const handleTagSelection = (e) => {
        const selectedTag = e.target.value;
        if (selectedTag && !todo.tags.includes(selectedTag)) {
            addTagToTodo(todo.id, selectedTag);
        }
    };

    return (
        <div className='bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md p-4 my-2'>
            <div className='flex justify-between items-center'>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={toggleComplete}
                    className='mr-4'
                    name='doneCheck'
                />
                <div className={`flex-grow cursor-pointer ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                </div>
                <div>
                    <button onClick={() => setShowNotes(!showNotes)} className='mr-2 text-blue-500 hover:text-blue-600'>Details</button>
                    <button onClick={deleteTodo} className='text-red-500 hover:text-red-600'>Delete</button>
                </div>
            </div>

            <div className='mt-2 flex items-center space-x-2'>
            {todo.tags.map(tag => (
                <div key={tag} className='inline-flex items-center bg-blue-500 text-white rounded shadow-sm space-x-1 mr-2 px-2'>
                    <span className="py-1 px-2">
                        {tag}
                    </span>
                    <button onClick={() => removeTagFromTodo(tag)} className="text-red-200 hover:text-red-300 p-1">x</button>
                </div>
            ))}
            </div>
            <div className="mt-2">
                <select onChange={handleTagSelection} className="p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                    <option value="">Add a tag</option>
                    {tags.filter(tag => !todo.tags.includes(tag)).map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            {showNotes && (
                <div className='mt-2'>
                    <textarea
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder='Add notes...'
                        className='w-full p-2 bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md'
                    ></textarea>
                    <button onClick={handleNotesSave} className='mt-2 p-1 bg-blue-500 text-white rounded-md'>Save Notes</button>
                
                    <div className="mt-4">
                        <h3 className="text-gray-600 dark:text-gray-300">Comments:</h3>
                        {todo.comments.map(comment => (
                            <div key={comment.id} className="border-t border-gray-300 dark:border-gray-700 p-2">
                                <textarea
                                    defaultValue={comment.text}
                                    onChange={(e) => handleCommentChange(comment.id, e.target.value)}
                                    className='w-full p-2 bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md'
                                ></textarea>
                                <button onClick={() => handleEditComment(comment.id)} className='mt-2 p-1 bg-blue-500 text-white rounded-md'>Save Comment</button>
                                <button onClick={() => deleteComment(todo.id, comment.id)} className="ml-2 text-red-500 hover:text-red-600">Delete</button>
                            </div>
                        ))}
                        <div className="mt-2">
                            <input 
                                type="text" 
                                value={newComment} 
                                onChange={e => setNewComment(e.target.value)} 
                                placeholder="Add a comment..."
                                className="p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            />
                            <button onClick={handleAddComment} className="mt-2 p-2 bg-blue-500 text-white rounded-md">
                                Add Comment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TodoItem