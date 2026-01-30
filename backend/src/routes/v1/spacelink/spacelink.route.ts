import express from 'express';
const router = express.Router()
import { createSpaceController } from '../../../controller/spacelink/create-spacelink.controller.js';
import { getSpaceController } from '../../../controller/spacelink/get-spacelink.controller.js';
import { getLinkController } from '../../../controller/spacelink/get-link.controller.js';
import { shareSpaceController } from '../../../controller/spacelink/share-spacelink.controller.js';

router.get('/', getSpaceController)


router.post('/create', createSpaceController)
router.get('/:link',getLinkController)
router.put('/:link',shareSpaceController)


export default router