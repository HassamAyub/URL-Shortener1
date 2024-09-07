const mongoose=require('mongoose');

const urlSchema=mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: { // Ensure this field is defined in your schema
        type: String,
        required: true
    },
    timehistory: [{
        timestamp: { type: Number }
    }]
}, { timestamps: true });

const urlmodel=mongoose.model('url2',urlSchema);

module.exports=urlmodel;