const { Prodact } = require("../models/products.models");
const { uploadToCloudinary } = require("../upload-media-cloud/cloudinary");

const getPruduct = async (req, res) => {
  const product = await Prodact.find({});
  res.send(product);
};

const getPruductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Prodact.findById(id).populate("userId");
    res.send(product);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const newProduct = async (req, res) => {
  const body = req.body;
  try {
    console.log(req.user);
    body.userId = req.user._id;
    const product = new Prodact(body);
    await product.save();
    res.send( "added");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const addImageProduct = async (req, res) => {
  try {
    const data = await uploadToCloudinary(req.file.path, "product-images");

    await Prodact.updateOne(
      { _id: req.params.id },
      {
        $set: {
          imageUrl: data.url,
          publicId: data.public_id,
        },
      },
    );
    res.status(200).send("image uploaded!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Cannot upload image !");
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const update = await Prodact.findByIdAndUpdate(id, body, { new: true });
    return res.send(update);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const deletProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const isDeleted = await Prodact.findByIdAndDelete(id);
    console.log(isDeleted);
    return res.send(isDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};




module.exports = {
  newProduct,
  deletProduct,
  updateProduct,
  getPruductById,
  getPruduct,
  addImageProduct,
};
