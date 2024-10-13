import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import NavBar from '../../components/NavBar';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const EditRecipe = () => {
  const [editor] = useState(() => withReact(createEditor()))
  const { id } = useParams();

  return (
    <div id="show-recipe" className="h-full divide-y">
      <NavBar />
      <div className="flex flex-row justify-center px-6 py-2 lg:px-8">
        <div>edit recipe: {id}</div>
        <Slate editor={editor} initialValue={initialValue}>
          <Editable />
        </Slate>
      </div>
    </div>
  );
};

export default EditRecipe;