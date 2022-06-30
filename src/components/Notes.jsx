import React from 'react';

export const Notes = () => {
  return (
    <div id='parent' className='p-3 rounded-xl bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:shadow-lg'>
      <p className='dark:text-gray-300 text-gray-600 uppercase p-2 pl-1 font-sans font-semibold text-sm'>
        N o t e s
      </p>
      <section className="dark:text-gray-300 text-gray-600 uppercase p-3 font-sans font-semibold text-sm dark:bg-gray-800 bg-gray-400 rounded-2xl m-2">
          <h3 className='dark:text-gray-300 text-gray-600 uppercase p-2 pl-0 font-sans font-semibold text-sm'>CREATE A NOTE</h3>
          <form className='bg-gray-300 dark:bg-gray-700 p-3 rounded-2xl' id="new-note-form">
              <h4 className='mb-3'>Anything you have to note down?</h4>
              <input 
                type="text" 
                placeholder="E.g. Structure of an atom..."
                className='m-0 mb-3 w-full border-none outline-none font-normal py-1 px-2 rounded bg-gray-200 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
                name="title"
                id="title" 
              />
                    
              <h4 className='mb-3'>Here goes the main body of your note.</h4>
              <input 
                type="text" 
                placeholder="E.g. An atom comprises of protons, neutrons, and electrons..."
                className='m-0 mb-3 w-full border-none outline-none font-normal py-1 px-2 rounded bg-gray-200 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
                name="body"
                id="body" 
              />
              <input type="submit" className='flex p-2 w-full rounded-xl justify-center items-center bg-gray-400 dark:bg-gray-900' value="Add note" />
          </form>
      </section >
      <section className="note-list dark:text-gray-300 text-gray-600 uppercase p-3 font-sans font-semibold text-sm dark:bg-gray-800 bg-gray-400 rounded-2xl m-2">
        <h3 className='dark:text-gray-300 text-gray-600 uppercase p-2 pl-0 font-sans font-semibold text-sm'>NOTES LIST</h3>
        <div className="list md:grid gap-3 mt-2 md:grid-cols-2" id="note-list"></div>
      </section>
    </div>
  );
};

export let notes = JSON.parse(localStorage.getItem('notes')) || [];

window.addEventListener('load', () => {
	const newNoteForm = document.querySelector('#new-note-form');

	newNoteForm.addEventListener('submit', e => {
		e.preventDefault();

		const note = {
			title: e.target.elements.title.value,
			body: e.target.elements.body.value,
			createdAt: new Date().getTime()
		};

		notes.push(note);

		localStorage.setItem('notes', JSON.stringify(notes));

		e.target.reset();

		DisplpayNotes();
	});

	DisplpayNotes();
});

export function DisplpayNotes () {
	const noteList = document.querySelector('#note-list');
	noteList.innerHTML = "";

	notes.forEach(note => {
		const noteItem = document.createElement('div');
		noteItem.classList.add('note-item');
        noteItem.classList.add('dark:bg-gray-700');
        noteItem.classList.add('w-full');
        noteItem.classList.add('bg-gray-200');
        noteItem.classList.add('p-3');
        noteItem.classList.add('rounded-xl');
        noteItem.classList.add('mb-3');
        noteItem.classList.add('md:mb-0');

		const title = document.createElement('div');
		title.classList.add('title');
		title.classList.add('flex');

		const body = document.createElement('div');
		body.classList.add('body');
		body.classList.add('flex');

		const editTitle = document.createElement('button');
		const editBody = document.createElement('button');
		const deleteButton = document.createElement('button');

		title.type = 'text';
		body.type = 'text';

		editTitle.classList.add('editTitle');
		editTitle.classList.add('bg-gray-400');
		editTitle.classList.add('dark:bg-gray-800');
		editTitle.classList.add('rounded-xl');
		editTitle.classList.add('m-1');
		editTitle.classList.add('p-1');
		editBody.classList.add('editBody');
		editBody.classList.add('bg-gray-400');
		editBody.classList.add('dark:bg-gray-800');
		editBody.classList.add('rounded-xl');
		editBody.classList.add('m-1');
		editBody.classList.add('p-1');
		deleteButton.classList.add('delete');
		deleteButton.classList.add('flex');
		deleteButton.classList.add('p-2');
		deleteButton.classList.add('w-full');
		deleteButton.classList.add('rounded-xl');
		deleteButton.classList.add('justify-center');
		deleteButton.classList.add('items-center');
		deleteButton.classList.add('bg-gray-400');
		deleteButton.classList.add('dark:bg-gray-800');

		title.innerHTML = `<input type="text" class="note-title-val bg-gray-400 ml-0 dark:bg-gray-800 outline-none border-none p-5 m-1 w-full rounded-xl overflow-scroll text-lg text-gray-600 dark:text-gray-300" value="${note.title}" readonly>`;
		body.innerHTML = `<input type="text" class="note-body-val bg-gray-400 ml-0 dark:bg-gray-800 outline-none border-none p-5 mt-0 h-20 m-1 w-full rounded-xl overflow-scroll text-lg text-gray-600 dark:text-gray-300" value="${note.body}" readonly>`;
		editTitle.innerHTML = 'Edit';
		editBody.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		noteItem.appendChild(title);
		noteItem.appendChild(body);
		title.appendChild(editTitle);
		body.appendChild(editBody);
		noteItem.appendChild(deleteButton);
		noteList.appendChild(noteItem);

		editTitle.addEventListener('click', (e) => {
			const titleVal = title.querySelector('input');
			titleVal.removeAttribute('readonly');
			titleVal.focus();
			titleVal.addEventListener('blur', (e) => {
				titleVal.setAttribute('readonly', true);
				note.title = e.target.value;
				localStorage.setItem('notes', JSON.stringify(notes));
				DisplpayNotes();
			});
		});
		editBody.addEventListener('click', (e) => {
			const bodyVal = body.querySelector('input');
			bodyVal.removeAttribute('readonly');
			bodyVal.focus();
			bodyVal.addEventListener('blur', (e) => {
				bodyVal.setAttribute('readonly', true);
				note.body = e.target.value;
				localStorage.setItem('notes', JSON.stringify(notes));
				DisplpayNotes();
			});
		});

		deleteButton.addEventListener('click', (e) => {
			notes = notes.filter(t => t !== note);
			localStorage.setItem('notes', JSON.stringify(notes));
			DisplpayNotes();
		});
	});
};
