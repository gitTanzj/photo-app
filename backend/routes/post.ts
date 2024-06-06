import { Router } from 'express'
import { getPosts, getPostsByAuthor, createPost } from '../controllers/postController' 

const router = Router();

router.get('/', getPosts);
router.get('/:authorId', getPostsByAuthor)
router.post('/', createPost)

export default router;