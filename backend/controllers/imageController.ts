import { Request, Response, Router} from 'express';
import Image from '../models/image'
import fs from 'fs';

interface Image {
    author: any,
    image_address: string,
    alt_text: string
}

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


const uploadImage = (req: Request, res: Response) => {
    try {
        console.log(req.body);
        fs.writeFile("image.jpeg", req.body, (error) => {
            if (error) {
                throw error;
            }
        });
  
        res.sendStatus(200);
      } catch (error) {
            res.sendStatus(500);
      }
}

export {
    getImagesByAuthor,
    getImagesByPost,
    uploadImage
}


