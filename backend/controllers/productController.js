const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const { ObjectId } = require('mongodb')
const User = require("../models/userModel")
// Generate a new ObjectID
const objectId1 = new ObjectId();

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, carton, dozen, quantity, price, description, approved, adminApproved } = req.body; // Include approved and adminApproved fields

  // Validation
  if (!name || !carton || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    carton : quantity/carton,
    quantity,
    dozen : quantity/dozen,
    price,
    description,
    image: fileData,
    approved, // Include approved field
    adminApproved: objectId1, // Include adminApproved field
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  let products
  const users = await User.find({_id:req.user.id})
  if(users[0].role == 'SuperAdmin'){
    products = await Product.find({}).sort("-createdAt");

  }
  else{
    products = await Product.find({ user: req.user.id }).sort("-createdAt");
  }
  
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const users = await User.find({_id:req.user.id})
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  console.log(users[0].role)
  if (users[0].role !== 'SuperAdmin') {
    res.status(401);
    //throw new Error(users[0].role);
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const users = await User.find({_id:req.user.id})
  //console.log(users)
  // if product doesn't exist
 
  // Match product to its user
  if ((product.user._id.toString() === req.user.id) || (users[0].role = 'SuperAdmin')) {
    await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Product deleted." });
  console.log('Deleted By:') 
  }
  else  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  else{
    res.status(401);
    throw new Error("User not authorized");
  }
  
});


// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    carton,
    quantity,
    dozen,
    price,
    description,
    image,
    approved,
    adminApproved} = req.body;
  const { id } = req.params;
  const users = await User.find({_id:req.user.id})
  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  
  if((users[0].role === 'SuperAdmin')|| (product.user._id.toString() === req.user.id)){
     // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  //Checking if approval tried
  if(product.user._id.toString() === req.user.id){
    console.log('old: ', product.approved)
    console.log('new: ',approved)
    if(product.approved !== approved){
     console.log(product.user.name + 'tried changing approval status of product '+ product.name)
     approved = product.approved
     console.log('old: ', product.approved)
     console.log('new: ',approved)
    }

     }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      quantity,
      price,
      description,
      dozen,
      carton,
      adminApproved: req.user.id,
      approved, // Include approved field in the update
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
  }
  // Match product to its user
  else {
    res.status(401);
    throw new Error("User not authorized");
  }

 
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
