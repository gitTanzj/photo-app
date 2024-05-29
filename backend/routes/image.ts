import { Router } from 'express';
import { getImagesByAuthor, uploadImage, deleteImageByAddress } from '../controllers/imageController';
import bodyParser from 'body-parser';

const router: Router = Router();

router.get('/:author', getImagesByAuthor);
router.post('/upload', bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "10mb" }), uploadImage)
router.delete('/:id', deleteImageByAddress)

export default router;