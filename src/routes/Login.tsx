const { ipcRenderer } = require('electron');

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormRenderProps } from 'react-final-form';
import { shell } from 'electron';

import { AppContext } from '../context/App';
import { AuthTokenOptions } from '../types';
import { FieldInput } from '../components/fields/FieldInput';
interface IValues {
  token?: string;
  hostname?: string;
}


export const LoginRoute: React.FC = () => {
  const history = useHistory();
  const { isLoggedIn, login, validateToken } = useContext(AppContext);
  const [isValidToken, setIsValidToken] = useState<boolean>(true);

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

  const openLink = useCallback((url: string) => {
    shell.openExternal(url);
  }, []);

  const submit = useCallback(async (data: IValues) => {
    setIsValidToken(true);
    try {
      await validateToken(data as AuthTokenOptions);
      history.goBack();
    } catch (err) {
      setIsValidToken(false);
    }
  }, []);

  const renderForm = (formProps: FormRenderProps) => {
    const { handleSubmit, submitting, pristine, values } = formProps;

    return (
      <form onSubmit={handleSubmit}>
        <FieldInput
          name="token"
          label="Token"
          placeholder="The 40 characters token generated on GitHub"
        />

        <FieldInput
          name="hostname"
          label="Hostname"
          placeholder="github.company.com"
        />

        <button
          className="float-right px-4 py-2 my-4 bg-gray-300 font-semibold rounded text-sm text-center hover:bg-gray-500 hover:text-white dark:text-black focus:outline-none"
          disabled={submitting || pristine}
          type="submit"
          title="Submit Button"
        >
          Login
        </button>
      </form>
    );
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center p-4 bg-white dark:bg-gray-dark dark:text-white">
      <div className="my-4 px-2.5 py-1.5 font-semibold text-center">
        GitLab Notifications <br /> on your menu bar. <br />
        <span className='font-normal text-sm'>Fill in the values below to get started!</span>
      </div>

      <div className="flex-1 px-2">
        <Form
          onSubmit={submit}
          // validate={validate}
        >
          {renderForm}
        </Form>
      </div>
    </div>
  );
};
