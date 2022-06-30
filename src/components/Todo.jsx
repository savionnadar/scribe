import React from 'react';

import './Todo.css';

export const Todo = ({ darkTheme }) => {
    return (
        <div className='p-3 rounded-xl bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:shadow-lg'>
            <p className='dark:text-gray-300 mb-2 text-gray-600 uppercase p-2 pl-1 pb-0 font-sans font-bold text-md'>
                T o d o
            </p>
            <section className="dark:text-gray-300 text-gray-600 uppercase p-3 font-sans font-semibold text-sm dark:bg-gray-800 bg-gray-400 rounded-2xl m-2">
                <h3 className='dark:text-gray-300 text-gray-600 uppercase p-2 pl-0 font-sans font-semibold text-sm'>CREATE A TODO</h3>
                <form className='bg-gray-300 dark:bg-gray-700 p-3 rounded-2xl' id="new-todo-form">
                    <h4 className='mb-3'>What do you have to do?</h4>
                    <input 
                        type="text" 
                        placeholder="E.g. Finish coding my project..."
                        className='m-0 mb-3 w-full border-none outline-none font-normal py-1 px-2 rounded bg-gray-200 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
                        name="content"
                        id="content" />
                    
                    <h4>Pick a category</h4>
                    <div className="options flex m-2 justify-between">
                        <label className='flex ml-0 m-1 p-2 w-1/2 rounded-xl justify-center items-center bg-gray-400 dark:bg-gray-900 float-left'>
                            <input type="radio" name="category" className='mr-2 accent-blue-600' id="category1" value="business" /> 
                            <span className="bubble business"></span>
                            <div>Business</div>
                        </label>
                        <label className='flex m-1 p-2 w-1/2 rounded-xl justify-center items-center bg-gray-400 dark:bg-gray-900 float-right'>
                            <input type="radio" name="category" className='mr-2 accent-green-500' id="category2" value="personal" />
                            <span className="bubble personal"></span>
                            <div>Personal</div>
                        </label>
                    </div>

                    <input type="submit" className='flex p-2 w-full rounded-xl justify-center items-center bg-gray-400 dark:bg-gray-900' value="Add todo" />
                </form>
            </section >
            <section className="todo-list dark:text-gray-300 text-gray-600 uppercase p-3 font-sans font-semibold text-sm dark:bg-gray-800 bg-gray-400 rounded-2xl m-2">
                <h3 className='dark:text-gray-300 text-gray-600 uppercase p-2 pl-0 font-sans font-semibold text-sm'>TODO LIST</h3>
                <div className="list bg-gray-300 dark:bg-gray-700 p-3 rounded-2xl" id="todo-list"></div>
            </section>
        </div>
    );
};

export let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('load', () => {
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	});

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		};

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		DisplayTodos();
	});

	DisplayTodos();
});

export function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
        todoItem.classList.add('dark:bg-gray-800');
        todoItem.classList.add('bg-gray-400');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');

		if (todo.category === 'personal') {
			span.classList.add('personal');
            
		} else {
			span.classList.add('business');
		};

		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		edit.classList.add('bg-gray-300');
		edit.classList.add('dark:bg-gray-700');
		deleteButton.classList.add('delete');
		deleteButton.classList.add('bg-gray-300');
		deleteButton.classList.add('dark:bg-gray-700');

		content.innerHTML = `<input type="text" class="todo-val overflow-scroll text-lg text-gray-600 dark:text-gray-300" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos();
			});
		});

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t !== todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos();
		});
	});
};
