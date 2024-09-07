const express=require('express');
const urlmodel = require('../Models/url');
const router=express.Router();

router.get('/',async (req,res)=>{
    const allurls=await urlmodel.find({});
    return res.render('home',{
        urls:allurls,
    });
})

module.exports=router;