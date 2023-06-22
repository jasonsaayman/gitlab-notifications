const { ipcRenderer } = require('electron');

import { useHistory } from 'react-router-dom';
import { Form, FormRenderProps } from 'react-final-form';
import React, { useCallback, useContext, useEffect } from 'react';

import { FieldInput } from '../components/fields/FieldInput';
import { AppContext } from '../context/App';
interface IValues {
  apiToken?: string;
  userName?: string;
  projectId?: string;
}

export const LoginRoute: React.FC = () => {
  const history = useHistory();
  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn) {
      ipcRenderer.send('reopen-window');
      history.replace('/');
    }
  }, [isLoggedIn]);

  // const openLink = useCallback((url: string) => {
  //   shell.openExternal(url);
  // }, []);

  const submit = useCallback(async (data: IValues) => {
   
  }, []);

  const renderForm = (formProps: FormRenderProps) => {
    const { handleSubmit, submitting, pristine } = formProps;

    return (
      <form onSubmit={handleSubmit}>
        <FieldInput
          name="apiToken"
          label="API Token"
          placeholder='xxxxx-xxxxxxxxxxxxxx-xxxxx'
        />

        <FieldInput
          name="projectId"
          label="Project ID"
          placeholder='1212898'
        />

        <FieldInput
          name="userName"
          label="User Name"
          placeholder='johndoe'
        />

        <button
          className="float-right px-4 py-2 my-4 bg-gray-700 font-semibold rounded text-xs text-center text-white focus:outline-none"
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
    <div className='flex flex-1 flex-col bg-gray-900 text-white'>
      <div className="flex flex-1 flex-col justify-center items-center p-4">
        <div className="my-4 px-2.5 py-1.5 font-semibold text-center">
          GitLab Notifications <br /> on your menu bar. <br />
          <span className='font-normal text-sm'>Fill in the values below to get started!</span>
        </div>
      </div>
      <div className="flex-1 px-8">
        <Form
          onSubmit={submit}
        >
          {renderForm}
        </Form>
      </div>
    </div>
  );
};
