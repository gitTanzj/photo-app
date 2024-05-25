import { Router } from 'express';
import { getCommentsByAuthor, getCommentsByPost} from '../controllers/commentController'

const router: Router = Router();

router.get('/:authorId', getCommentsByAuthor)
router.get('/:postId', getCommentsByPost)

export default router
