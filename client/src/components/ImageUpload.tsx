import React, { useState, FormEvent, ChangeEvent } from 'react'
import imagePlaceholder from '../assets/image-placeholder.png'
import axios from 'axios'

const ImageUpload = () => {

  const [postImage, setPostImage] = useState({myFile: ""})
  const [uploadFile, setUploadFile] = useState('' as any)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files === null) {
      return console.log('No file selected');
    }
    const file = e.target.files[0];
    setUploadFile(file);
    const base64: any = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:4000/image/upload', uploadFile, {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    })
    .then(() => {
      console.log('Image uploaded successfully')
    })
    .catch((error) => {
      console.log(error)
    })
    
  }

  const convertToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="custom-file-upload">
                <img src={postImage.myFile || imagePlaceholder} width="400"/>
            </label>
            <input
                type="file"
                aria-label="Image"
                name="myFile"
                id="file-upload"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => handleFileUpload(e)}
            />

            <button type='submit'>Upload photo</button>
        </form>
    </div>
  )
}

export default ImageUpload;

