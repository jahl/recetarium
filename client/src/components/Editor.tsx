import React, { useState } from 'react';
import Markdown from 'react-markdown';

interface TEditor {
  content: string;
  onContentChanged: (value : string) => void;
}

const Editor : React.FC<TEditor> = (props) => {
  const { content, onContentChanged } = props;

  const onChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChanged(event.target.value);
  };

  return (
    <div>
      <textarea
        className="border border-grey-500 w-full px-3 py-3 outline-none"
        cols={50}
        rows={10}
        value={content}
        onChange={onChange} />
      <div className="md-preview">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default Editor;