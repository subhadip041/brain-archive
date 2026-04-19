import express from 'express';
const router = express.Router()
import authRouter from "./auth/auth.routes.js"
import contentRouter from "./content/content.route.js"


router.get('/',(req,res)=>{
    res.status(200).json({
        msg:"from v1"
    })
})

router.use('/auth',authRouter)
router.use('/content',contentRouter)


export default router