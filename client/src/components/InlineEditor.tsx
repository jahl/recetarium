import React, { useState } from 'react';

interface TInlineEditor {
  value: string;
  onValueChanged: (value : string) => void;
}

const InlineEditor : React.FC<TInlineEditor> = (props) => {
  const { value, onValueChanged } = props;
  const [isEditing, setIsEditing] = useState(false);

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
        ? <input className="text-3xl text-center py-3 min-w-full" type='text' value={value} onChange={onChange} />
        : <h1 className="text-3xl text-center py-3" onClick={toggleEditing}>{value}</h1>
      }
    </div>
  );
};

export default InlineEditor