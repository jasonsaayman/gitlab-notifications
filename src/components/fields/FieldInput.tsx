import React from 'react';
import { Field } from 'react-final-form';

export interface IProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  helpText?: React.ReactNode | string;
  required?: boolean;
}

export const FieldInput: React.FC<IProps> = ({
  label,
  name,
  placeholder = '',
  helpText,
  type = 'text',
  required = false,
}) => {
  return (
    <Field name={name}>
      {({ input, meta: { touched, error } }) => (
        <div className="mt-2">
          <label
            className="block text-white text-xs mb-2"
            htmlFor={input.name}
          >
            {label}
          </label>

          <input
            type={type}
            className="appearance-none block w-full rounded-sm bg-gray-700 text-white text-xs py-1.5 px-4 mb-2 focus:outline-none"
            id={input.name}
            placeholder={placeholder}
            required={required}
            {...input}
          />

          {helpText && (
            <div className="mt-3 text-white text-xs">
              {helpText}
            </div>
          )}

          {touched && error && (
            <div className="mt-2 text-red-500 text-xs italic">{error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
