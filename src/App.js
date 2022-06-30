import { useState } from "react";

import { Navbar } from "./components/Navbar";
import { Notes } from "./components/Notes";
import { Todo } from "./components/Todo";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="flex overflow-hidden dark:bg-gray-900 bg-gray-100 dark:text-gray-200">
        <div className="flex top-0 left-0 h-screen w-20 items-center justify-center">
          <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
        </div>
        <div className="w-screen">
          <p className="text-lg m-5 mb-3 w-fit font-bold py-1 px-2 rounded bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            infinite
          </p>
          <section className="m-5">
            <h2 className="text-md mb-3 w-full font-semibold py-2 px-3 rounded-xl bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              What's up! Great to see you back : ) Anything you have to do or note down?: <input type="text" className="capitalize w-fit text-lg font-bold appearance-none border-none outline-none bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300" id="name" placeholder="Rick" />
            </h2>
          </section>
          <div className="m-5 w-auto md:float-left md:w-1/4">
            <Todo darkTheme={darkTheme} />
          </div>
          <div className="m-5 md:ml-0 mt-5 md:m-5 md:float-right md:w-2/3">
            <Notes />
          </div>
        </div>
      </div>
    </div>
  );
};

window.addEventListener('load', () => {
	const nameInput = document.querySelector('#name');
	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	});
});

export default App;
