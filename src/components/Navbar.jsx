import React from 'react';

import { DisplayTodos } from './Todo';
import { todos } from './Todo';

import dark from './icons/dark.png';
import light from './icons/light.png';
import todoLight from './icons/todoLight.png';
import todoDark from './icons/todoDark.png';
import noteLight from './icons/noteLight.png';
import noteDark from './icons/noteDark.png';

export const Navbar = ({ darkTheme, setDarkTheme }) => {
    return (
        <div className='fixed rounded-xl flex flex-col bg-gray-300 dark:bg-gray-600'>
            <button type='button' onClick={() => setDarkTheme(!darkTheme)} className='m-3 w-8 h-8 rounded py-1.5 px-1.5 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:shadow-lg'>
                { darkTheme ? <img src={ light } alt="light" /> : <img src={ dark } alt="dark" /> }
            </button>
            <button type='button' id='todoBtn' className='m-3 w-8 h-8 rounded py-1.5 px-1.5 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:shadow-lg'>
                { darkTheme ? <img src={ todoLight } alt="todoLight" /> : <img src={ todoDark } alt="todoDark" /> }
            </button>       
            <button type='button' className='m-3 w-8 h-8 rounded py-1.5 px-1.5 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:shadow-lg'>
                { darkTheme ? <img src={ noteLight } alt="noteLight" /> : <img src={ noteDark } alt="noteDark" /> }
            </button>
        </div>
    );
};

window.addEventListener('load', () => {
    const todoBtn = document.querySelector('#todoBtn');

    if (todoBtn) {
        todoBtn.addEventListener('click', e => {
            e.preventDefault();

            const todo = {
                content: 'Unknown task',
                category: 'personal',
                done: false,
                createdAt: new Date().getTime()
            }

            todos.push(todo);

            localStorage.setItem('todos', JSON.stringify(todos));

            DisplayTodos();
        });
    };

	DisplayTodos();
});
