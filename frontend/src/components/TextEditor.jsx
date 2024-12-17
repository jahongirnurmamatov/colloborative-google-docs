import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const TOOLBAR_OPTIONS = {
    toolbar:[
        ['bold', 'italic', 'underline','strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],               // custom button options
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],                                 // font family
        [{'align': []}],
        ['clean']                                         // remove formatting button
    ]
}
    

const TextEditor = () => {
    const [value, setValue] = useState('');
  return (

    <div className="container">
    <ReactQuill modules={TOOLBAR_OPTIONS} value={value} onChange={setValue} />

 </div>
  )
}

export default TextEditor