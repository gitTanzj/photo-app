import { Router } from 'express';
import { getImagesByAuthor, uploadImage } from '../controllers/imageController';

const router: Router = Router();

router.get('/:authorId', getImagesByAuthor);
router.post('/upload', uploadImage)

export default router;