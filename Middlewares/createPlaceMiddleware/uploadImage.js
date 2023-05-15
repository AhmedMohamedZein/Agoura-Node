const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

const uploadImage = async (req, res , next) => {
  try {
    const promises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            console.error('Error uploading file to Cloudinary:', error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        });

        uploadStream.end(file.buffer);
      });
    });

    const urls = await Promise.all(promises); // All the urls from cloudinary as array [] 
    console.log("Urls in array form: ",urls);
    req.body.images= urls;
    next();
  } catch (error) {
    console.error('Error processing image uploads:', error);
    res.status(500).json({ success: false, message: 'Error uploading images' });
    return;
  }
}

module.exports = uploadImage ;