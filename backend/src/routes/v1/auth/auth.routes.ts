import express from 'express';
const router = express.Router()
import { signUpController } from '../../../controller/auth/signup.controller.js';
import { signInController } from '../../../controller/auth/signin.controller.js';

router.get('/',(req,res)=>{
    res.status(200).json({
        msg:"from auth touter"
    })
})


router.post('/signup',signUpController)

router.post('/signin',signInController)

export default router