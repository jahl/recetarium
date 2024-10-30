import React, { useEffect, useRef, useState } from 'react';

interface TInlineEditor {
  value: string;
  onValueChanged: (value : string) => void;
}

const InlineEditor : React.FC<TInlineEditor> = ({ value, onValueChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    onValueChanged(event.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-row justify-center py-2">
      {
        isEditing 
        ? <input
            ref={inputRef}
            className="text-3xl text-center py-3 min-w-full" 
            type='text'
            value={value}
            onChange={onChange}
            onBlur={toggleEditing} />
        : <h1
            className="text-3xl text-center py-3 font-bold"
            onClick={toggleEditing}>
            {value}
          </h1>
      }
    </div>
  );
};

export default InlineEditor