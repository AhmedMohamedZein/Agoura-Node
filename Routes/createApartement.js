const multer=require("multer")
const cloudinary = require('cloudinary').v2;
const express = require("express");
const router = express.Router();

// Configuration 
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
});


const upload = multer();

function setupRequest(req, res, next) {
    req.body=JSON.parse(req.body.data)
    req.body.images=[]
    next()
}

router.post('/create', upload.array('photo'),setupRequest, async (req, res) => {
  try {
    const promises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            console.error('Error uploading file to Cloudinary:', error);
            reject(error);
          } else {
            console.log('File uploaded to Cloudinary:', result);
            resolve(result.secure_url);
          }
        });

        uploadStream.end(file.buffer);
      });
    });

    const urls = await Promise.all(promises);
    req.body.images=urls
    // console.log('Uploaded image URLs:', req.body);    
    console.log(req.body);

    res.json({ success: true, message: 'Images uploaded successfully', data:req.body });
  } catch (error) {
    console.error('Error processing image uploads:', error);
    res.json({ success: false, message: 'Error uploading images' });
  }
});

module.exports=router


