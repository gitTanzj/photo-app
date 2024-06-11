import React, { useState, FormEvent, ChangeEvent, SetStateAction } from 'react'
import imagePlaceholder from '../../assets/image-placeholder.png'
import axios from 'axios'
import './ImageUpload.css'

interface ImageUploadProps {
  setUploading: (value: boolean) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ setUploading }) => {

  const [postImage, setPostImage] = useState({myFile: ""})
  const [uploadFile, setUploadFile] = useState("" as any)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files === null) {
      return console.log('No file selected');
    }
    const file = e.target.files[0];
    setUploadFile(file);
    const base64: any = await convertToBase64(file);
    setPostImage({ myFile: base64 })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(uploadFile){
      axios.post('http://localhost:4000/image/upload', uploadFile, {
        headers: {
          'Content-Type': 'image/jpeg'
        }
      })
      .then((response) => {
        console.log(response.data.message)
        setUploading(false)
        setUploadFile(null)
        setPostImage({myFile: ""})
      })
      .catch((error) => {
        console.log(error)
      })
    } else{
      console.log("No image selected")
    }
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
    <div className="image-upload">
        <form onSubmit={handleSubmit} className="image-upload-form">
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
            <button onClick={() => setUploading(false)}>Cancel</button>
        </form>
    </div>
  )
}



