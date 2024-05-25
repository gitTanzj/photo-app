import React, { useState, FormEvent, ChangeEvent } from 'react'
import imagePlaceholder from '../assets/image-placeholder.png'
import axios from 'axios';
import dotenv from 'dotenv';

// CLOUDINARY
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const ImageUpload = () => {
  const cld = new Cloudinary({cloud: {cloudName: process.env.CLOUDINARY_CLOUD_NAME}});

  const [postImage, setPostImage] = useState({myFile: ""})

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files === null) return console.log('No file selected');
    const file = e.target.files[0];
    const base64: any = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement && e.target.files) {
      const img = cld.image(postImage.myFile)
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500));
      console.log(img)
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

