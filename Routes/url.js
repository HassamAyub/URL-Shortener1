const express=require('express');
const router=express.Router();

const {
    handleCreateShortUrl,
    handleGetAllUrls,
    handleRedirect,
    handleAnalytics,
}=require('../controllers/url.js')

router.
route('/')
.post(handleCreateShortUrl)
.get(handleGetAllUrls);

router.get('/:id',handleRedirect);
router.get('/analytic/:id',handleAnalytics);

module.exports=router;