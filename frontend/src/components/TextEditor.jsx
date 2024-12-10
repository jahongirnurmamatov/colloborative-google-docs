import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const TextEditor = () => {
    const [value, setValue] = useState('');
  return (

    <div className="container">
    <ReactQuill theme="snow" value={value} onChange={setValue} />

 </div>
  )
}

export default TextEditor