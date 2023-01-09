import { ChangeEvent, useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
    value,
      onChange,
    },
  };
};

export default useInput;
