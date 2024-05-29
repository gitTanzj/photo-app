import { Request, Response, Router} from 'express';
import Image from '../models/image'
import fs from 'fs';
import cloudinary from '../utils/cloudinary'
import multer from 'multer'
import { Readable } from 'stream';
import mongo from 'mongodb';

interface Image {
    author: any,
    image_address: string,
    alt_text: string
}

const upload = multer({ storage: multer.memoryStorage() });

const getImagesByAuthor = (req: Request, res: Response) => {
    const author = req.params.author
    Image.find({author: author})
    .then((images) => {
        res.status(200).json({images: images})
    })
    .catch((error) => {
        // add error handling
    })
}

const getImagesByPost = (req: Request, res: Response) => {
    const postId = req.params.id
    Image.find({post: postId})
    .then((images) => {
        res.status(200).json({images: images})
    })
    .catch((error: Error) => {
        console.log(error)
    })
}


const uploadImage = async (req: Request, res: Response) => {

    try {
        if (!req.body) {
          res.status(400).send('No file uploaded.');
          return;
        }
    
        const currDate = new Date().toJSON().slice(0, 10);
        const index = (await Image.find()).length;
        const image_path = `${req.session?.user?.user_id}/${currDate}_${index}`;
    
        const uploadResult = await cloudinary.uploader.upload_stream(
          {
            public_id: image_path
          },
          (error, result) => {
            if (error) {
              console.log(error);
              res.status(500).send('Upload to Cloudinary failed.');
            } else {
              const optimizeUrl = cloudinary.url(image_path, {
                fetch_format: 'auto',
                quality: 'auto',
              });

              const image = new Image({
                author: req.session?.user?.user_id,
                image_address: optimizeUrl
              })
              image.save()
              .then(() => {
                res.status(201).json({
                    message: 'Image uploaded successfully.',
                    image: image
                })
              })
              .catch((error) => {
                res.status(500).json({
                    message: 'Error occurred while uploading the image.'
                })
              })
            }
          }
        );

        const readStream = new Readable();
        readStream._read = () => {};
        readStream.push(Buffer.from(req.body.buffer));
        readStream.push(null);
        readStream.pipe(uploadResult);
    } catch (error) {
        res.status(500);
    }
}

const deleteImageByAddress = (req: Request, res: Response) => {

}

export {
    getImagesByAuthor,
    getImagesByPost,
    uploadImage
}


