import express from 'express';
const router = express.Router()
import authRouter from "./auth/auth.routes.js"


router.get('/',(req,res)=>{
    res.status(200).json({
        msg:"from v1"
    })
})

router.use('/auth',authRouter)


export default router