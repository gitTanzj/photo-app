import { request, response, Router } from 'express';
import Post from '../models/post';

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