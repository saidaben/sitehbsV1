const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer"); //3 dependances non native multer lib qui gère l'upload convertie les fichiers uploader

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  //dossier dans lequel mes pix sont enregistrés
  folder: "user-pictures",
  // ci-dessous, si besoin d'uploader de la video ...
  /*
    params: { resource_type: "raw" }
    */
});

const fileUploader = multer({ storage });

module.exports = fileUploader;
