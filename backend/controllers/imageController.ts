import { Request, Response, Router} from 'express';
import Image from '../models/image'

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
    



}

export {
    getImagesByAuthor,
    getImagesByPost,
    uploadImage
}


