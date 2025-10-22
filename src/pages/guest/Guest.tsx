import { useMemo, useState } from 'react';
import { debounce } from '@/utils/debounce';

const Guest = () => {
  const [text, setText] = useState('');
  const [textDebounced, setTextDebounced] = useState('');

  const debouncedSetText = useMemo(
    () =>
      debounce((value: string) => {
        setTextDebounced(value);
      }, 2500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    debouncedSetText(e.target.value);
  };

  return (
    <div className="p-10">
      <input
        className="border"
        type="text"
        value={text}
        onChange={handleChange}
      />
      <div>Text: {textDebounced}</div>
    </div>
  );
};

export default Guest;
