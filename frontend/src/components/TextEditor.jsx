import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {io} from 'socket.io-client'
import { useParams } from "react-router-dom";

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
  const [socket, setSocket] = useState();
  const { id } = useParams();
  const [value, setValue] = useState("");
  const quillRef = useRef();

    useEffect(()=>{
      const s = io('http://localhost:3000');
      setSocket(s);

      const editor = quillRef.current.getEditor();
      const timer = setInterval(() => {
        socket.emit("save-document", editor.getContents());
      }, 3000);
      editor.disable();
      editor.setText("Loading...");

      setSocket(socket);

    socket.emit("get-document", id);

    // load document
    const loadDocument = document => {
      editor.setContents(document);
      editor.enable();
    };
    // once() cleans up itself when the
    socket.once("load-document", loadDocument);

    // Receive changes
    const updateChangesWithDelta = (delta, receivedId) => {
      if (quillRef.current == null || id !== receivedId) return;
      editor?.updateContents(delta);
    };
    socket.on("receive-changes", updateChangesWithDelta);

    return () => {
      clearInterval(timer);
      socket.off("receive-changes", updateChangesWithDelta);
      socket.disconnect();
    };
    },[]);

    const changeHandler = (value, delta, source) => {
      setValue(value);
      if (socket == null) return;
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
  return (

    <div className="container">
    <ReactQuill modules={TOOLBAR_OPTIONS} 
    ref={node => (quillRef.current = node)}
    theme="snow"
      value={value}
      onChange={changeHandler}
    />

 </div>
  )
}

export default TextEditor