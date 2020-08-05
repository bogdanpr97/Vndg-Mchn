import { useState } from 'react';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  function onChange(e) {
    setValue(e.target.value);
  };

  return {
    value,
    setValue,
    reset: () => setValue(""),
    onChange,    
  }
}

export default useInput;