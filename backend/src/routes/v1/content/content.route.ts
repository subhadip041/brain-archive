import express from 'express';
const router = express.Router()
import { authMiddleware } from '../../../middleware/auth.middleware.js';
import { createContentController } from '../../../controller/content/create.controller.js';
import { getContentController } from '../../../controller/content/get.controller.js';
import { updateContentController } from '../../../controller/content/update.controller.js';
import { deleteContentController } from '../../../controller/content/delete.controller.js';

router.use(authMiddleware)


router.get('/', getContentController)
router.post('/',createContentController)
router.put('/',updateContentController)
router.delete('/',deleteContentController)


export default router