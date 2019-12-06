import PublishIcon from '@material-ui/icons/Publish';
import React, { Component, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';


function MyDropzone(props) {
    const onDrop = useCallback(acceptedFiles => {  
     
         acceptedFiles.forEach((file) => {
           const reader = new FileReader()
           reader.onabort = () => console.log('file reading was aborted')
           reader.onerror = () => console.log('file reading has failed')
           reader.onload = () => {
             // Do whatever you want with the file contents
             const binaryStr = reader.result
             let jsonLayer = JSON.parse(binaryStr)
             props.handleNewFile(jsonLayer);
             console.log(jsonLayer);
           }
           reader.readAsBinaryString(file)
         })
       }, []);
   
     const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
   
       return (
         <div {...getRootProps()}>
           <input {...getInputProps()} />
           {
             isDragActive ?
              <p style={{height: "75px",  position: "flex", textAlign: "center", border: "dashed", boxShadow: "10", background: "lightgreen"}}><PublishIcon /></p>:
              <div>
               <p style={{height: "75px", position: "flex", textAlign: "center", border: "dashed"}}><PublishIcon /><p>Click or drag to add files!</p></p>
               
              </div>
           }
         </div>
       )
     }

export default MyDropzone;