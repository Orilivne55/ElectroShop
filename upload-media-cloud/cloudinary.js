const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dzbpst1um",
  api_key: "782545855348857",
  api_secret: "OiQdKjO6JTMYUQmR2_Sa6HUwWzo",
});

uploadToCloudinary = (path, folder) => {
  return cloudinary.v2.uploader
    .upload(path, {
      folder,
    })
    .then((data) => {
      return { url: data.url, public_id: data.public_id };
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {uploadToCloudinary}
