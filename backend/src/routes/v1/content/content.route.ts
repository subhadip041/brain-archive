import express from 'express';
const router = express.Router()
import { authMiddleware } from '../../../middleware/auth.middleware.js';
import { createContentController } from '../../../controller/content/create.controller.js';
import { getContentController } from '../../../controller/content/get.controller.js';

router.use(authMiddleware)


router.get('/', getContentController)
router.post('/',createContentController)


export default router