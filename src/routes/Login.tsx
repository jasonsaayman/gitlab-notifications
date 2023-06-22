const { ipcRenderer } = require('electron');

import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../context/App';

export const LoginRoute: React.FC = () => {
  const history = useHistory();
  const { isLoggedIn, login } = useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn) {
      ipcRenderer.send('reopen-window');
      history.replace('/');
    }
  }, [isLoggedIn]);

  const loginUser = useCallback(async () => {
    try {
      await login();
    } catch (err) {
      // Skip
    }
  }, []);

  const loginButtonClass =
    'w-48 py-2 my-2 bg-gray-300 font-semibold rounded text-xs text-center dark:text-black hover:bg-gray-500 hover:text-white focus:outline-none';

  return (
    <div className="flex flex-1 flex-col justify-center items-center p-4 bg-white dark:bg-gray-dark dark:text-white">

      <div className="my-4 px-2.5 py-1.5 font-semibold text-center">
        GitLab Notifications <br /> on your menu bar.
      </div>

      <button
        className={loginButtonClass}
        onClick={loginUser}
        aria-label="Login with GitHub"
      >
        Login to GitLab
      </button>
    </div>
  );
};
