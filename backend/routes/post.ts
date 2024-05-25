import { Router } from 'express'
import { getPosts, getPostsByAuthor } from '../controllers/postController' 

const router = Router();

router.get('/', getPosts);
router.get('/:authorId', getPostsByAuthor)

export default router;