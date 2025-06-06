import type { FieldError, UseFormRegister } from 'react-hook-form';

export type InputTypes = 'text' | 'number';

export type FormFieldName = {
    name: string;
    surname: string;
    age: number;
    profession?: string;
};

export type FieldProps = {
    name: ValidFieldNames;
    label: string;
    type: InputTypes;
    placeholder: string;
    register: UseFormRegister<FormFieldName>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidFieldNames = 'name' | 'surname' | 'age' | 'profession';
