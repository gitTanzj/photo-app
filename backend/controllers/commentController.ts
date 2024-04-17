import { request, response, Router } from 'express';

const router: Router = Router();

interface User {
    username: string;
    email: string;
}

interface Post {
    title: string;
    description: string;
    author: User;
}

interface Comment {
    date: Date;
    content: string;
    post: Post;
    author: User;
}