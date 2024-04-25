"use client";

import {BlockNoteEditor,PartialBlock} from '@blocknote/core';
import {BlockNoteView,useBlockNote} from '@blocknote/react';
import '@blocknote/core/style.css';
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore"
import { useEffect } from 'react';

interface EditorProps{
    onChange:(value:string) => void;
    initialContent?:string;
    editable?:boolean;
  };

    const Editor = ({ onChange,initialContent,editable}:EditorProps) => {

    const resolvedTheme = useTheme();
    const {edgestore} = useEdgeStore();

    const handleUpload = async (file:File) => {
      const response = await edgestore.publicFiles.upload({file});
  
      return response.url;
    } 

    const editor: BlockNoteEditor = useBlockNote ({
        initialContent:initialContent ? 
        JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
      });

       // Assign onChange function with correct signature
  editor.onChange = (callback) => {
    callback(editor); // Pass the editor to the callback function
  };

  // When editor content changes, call the onChange prop
  useEffect(() => {
    onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
  }, [editor, onChange]);

      if (editor.setEditable && typeof editable === 'boolean') {
        editor.setEditable(editable);
      }

    return (
        <div>
           <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'}/>
        </div>
    )
    };

    export default Editor;