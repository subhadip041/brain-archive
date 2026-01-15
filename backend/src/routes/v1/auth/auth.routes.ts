import express from 'express';
const router = express.Router()


router.get('/',(req,res)=>{
    res.status(200).json({
        msg:"from auth touter"
    })
})


router.post('/signup',(req,res)=>{
    const signUpPayload = req.body;
    console.log(signUpPayload)
    res.status(200).json({  
         msg: req.body,
    })

})

router.post('/signin',(req,res)=>{
    const signInPayload = req.body;
        console.log(signInPayload)

    res.status(200).json({
       msg: req.body,
       
    })

})

export default router