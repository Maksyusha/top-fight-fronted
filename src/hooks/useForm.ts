import { useState, ChangeEvent } from 'react';

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
