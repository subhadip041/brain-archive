import express from 'express';
const router = express.Router()
import { authMiddleware } from '../../../middleware/auth.middleware.js';


router.get('/',authMiddleware,(req,res)=>{
    res.status(200).json({
        msg:"from content touter"
    })
})


export default router