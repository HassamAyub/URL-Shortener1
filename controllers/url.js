const urlmodel=require('../Models/url.js')
const shortid=require('shortid')

// shortID, redirectURL, timehistory


// create new short URL >>>>>>>>>>>>>>>>>>>>>>>
async function handleCreateShortUrl(req,res) {
    const body=req.body;
    if(!body){return res.status(400).json({error:"data incomplete"})}
    try {

        const newid=shortid.generate();
        await urlmodel.create({
            shortID:newid,
            redirectURL:body.url,
            timehistory:[],
        })
        return res.render('home',{
            id:newid
        });

    } catch (error) {
        return res.status(500).json({Error:error,
            errorType:'server side error'
        })
    }

}

// get all URL >>>>>>>>>>>>>>>>>>>>>>>>>
async function handleGetAllUrls(req,res) {
    const urlList=await urlmodel.find({})
    return res.status(200).json({urls:urlList})
}

// redirect url >>>>>>>>>>>>>>>>>>>>>>>>>
async function handleRedirect(req,res) {
    const id=req.params.id;
    await urlmodel.findOneAndUpdate({shortID:id},
        {
            $push:{
            timehistory:{timestamp:Date.now()}
            }
        }
    ).then(entity=>{
        try {
            res.redirect(entity.redirectURL)
        } catch (error) {
            res.status(400).json({error:'invalid id'});
        }
    })
    
    
}

// count number of click >>>>>>>>>>>>>>>>>>>>>>>>>
async function handleAnalytics(req,res) {
    const id=req.params.id;
    try {
        const entity= await urlmodel.findOne({shortID:id})
            res.status(200).json({click:`number of clicks: ${entity.timehistory.length}`,
            time:entity.timehistory})

    } catch (error) {
        res.status(400).json({error:error})
    }
}


// export all api's
module.exports={
    handleCreateShortUrl,
    handleGetAllUrls,
    handleRedirect,
    handleAnalytics,
};