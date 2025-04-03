import React, { useState } from 'react';
import './FileEditor.css';

const FileEditor = ({ content, onContentChange, fileName = "untitled.txt" }) => {
  const [localContent, setLocalContent] = useState(content || '');

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div className="file-editor">
      <div className="editor-header">
        <h3>
          <span className="file-icon">📄</span>
          <span className="file-name">{fileName}</span>
        </h3>
        <button className="save-button">Save Changes</button>
      </div>
      <textarea
        value={localContent}
        onChange={handleContentChange}
        className="editor-content"
        placeholder="Write or modify code here... (Use the 'Demo Code' button above to load sample files)"
      />
    </div>
  );
};

export default FileEditor; 