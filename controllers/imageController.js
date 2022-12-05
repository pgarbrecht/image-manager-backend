const db = require('../models');
const imgbbUploader = require("imgbb-uploader");

// This route returns list of all product objects
const index = (req, res) => {
    db.Images.find(
        {}, (error, allImages) => {
        if(error) return res.status(400).json({ error: error.message });
  
        return res.status(200).json({
            allImages,
            requestedAt: new Date().toLocaleString()
        }); 
    })
}

// This route creates a new product in the database
const create = (req, res) => {
    db.Images.create(
        req.body, (error, createdImage) => {
            if(error) return res.status(400).json({ error: error.message });
            return res.status(200).json(createdImage)
        }
    )
}

// This route updates a product in the database
const update = (req, res) =>{
    db.Images.findByIdAndUpdate(req.params.id,
        {
            $set: req.body
        },
        {new: true},
        (err, updatedImage) => {
            if(err) return res.status(400).json({error: err.message})
            return res.status(200).json(updatedImage) 
        }
    )
}

// This route deletes a product in the database
const destroy = (req, res) => {
    db.Images.findByIdAndDelete(req.params.id, (error, deletedImage) => {
        if(!deletedImage) return res.status(400).json({error: "Image not found"})
        if(error) return res.status(400).json({error: error.message})
        return res.status(200).json({
            message: `Image ${deletedImage.title} deleted successfully`
        })
    })
}

//route for posting images
const upload = (req, res) => {
    console.log("reached /imageupload endpoint");
    const options = {
      apiKey: "f30d5aa2335f24a540d204cd3ca82e82", // MANDATORY apikey for imgBB
      base64string: req.body.base64string,
      // OPTIONAL: pass base64-encoded image (max 32Mb)
    };
    imgbbUploader(options)
      .then((response) => {
        console.log(response);
        return res.status(200).json({
          message: "Uploaded image successfully",
          image: response.url,
        });
      })
      .catch((error) => console.error(error));
}

module.exports = {
    index,
    create,
    update,
    destroy,
    upload
}
