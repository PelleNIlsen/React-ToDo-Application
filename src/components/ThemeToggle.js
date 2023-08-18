import React from 'react'

const ThemeToggle = ({ toggleTheme, currentTheme }) => {
  return (
    <button
        onClick={toggleTheme}
        className='p-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md mb-4'
    >
        {currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  )
}

export default ThemeToggle