import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';

const DynamicTextArea = () => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);

  // Optional: Focus on mount
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  return (
    <Input.TextArea
      ref={textAreaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoSize={{
        minRows: 2,
        maxRows: 8
      }}
      placeholder="Type something..."
      style={{ resize: 'none' }} // Disable manual resize
    />
  );
};

export default DynamicTextArea;