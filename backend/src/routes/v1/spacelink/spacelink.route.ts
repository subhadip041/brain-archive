import express from 'express';
const router = express.Router()
import { createSpaceController } from '../../../controller/spacelink/create-spacelink.controller.js';


router.get('/', (req,res)=>{
    res.status(200).json({
        msg:"from space link"
    })
})


router.post('/create', createSpaceController)

export default router