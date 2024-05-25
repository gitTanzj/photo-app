import { Request, Response } from 'express';
import Post from '../models/post';

interface User {
    username: string;
    email: string;
}

interface Post {
    title: string;
    description: string;
    author: User;
}

const getPosts = (req: Request, res: Response) => {
    Post.find()
    .then((posts) => {
        return res.status(200).json({posts: posts})
    })
    .catch((error: Error) => {
        // add error handling
    })

}

const getPostsByAuthor = (req: Request, res: Response) => {
    const authorId = req.params.author
    Post.find({author: authorId})
    .then((posts) => {
        return res.status(200).json({posts: posts})
    })
    .catch((error: Error) => {
        console.log(error)
    })
}

export {
    getPosts,
    getPostsByAuthor
}