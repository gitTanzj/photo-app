import { Router } from 'express';
import { getImagesByAuthor, uploadImage } from '../controllers/imageController';
import bodyParser from 'body-parser';

const router: Router = Router();

router.get('/:authorId', getImagesByAuthor);
router.post('/upload', bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "10mb" }), uploadImage)

export default router;