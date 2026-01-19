import express from 'express';
const router = express.Router()
import { signUpController } from '../../../controller/auth/signup.controller.js';

router.get('/',(req,res)=>{
    res.status(200).json({
        msg:"from auth touter"
    })
})


router.post('/signup',signUpController)

router.post('/signin',(req,res)=>{
    const signInPayload = req.body;
        console.log(signInPayload)

    res.status(200).json({
       msg: req.body,
       
    })

})

export default router