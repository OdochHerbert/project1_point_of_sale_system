import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
 


const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  approved: false,
// Set adminApproved as an object with id and name fields
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedProductValue, setSelectedProductValue] = useState(null);

  const isLoading = useSelector(selectIsLoading);

  const { name, carton,dozen, price, quantity, approved, adminApproved } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "adminApprovedId") {
      // If changing adminApproved id, update the id and name fields of adminApproved object
      setProduct({
        ...product,
        adminApproved: { ...adminApproved, id: value, name: "adminName" }, // Here "adminName" is just a placeholder, you should replace it with the actual name value.
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", selectedProductValue);
    formData.append("sku", generateKSKU(selectedProductValue));//previuosly on category
    formData.append("price", price);
    formData.append("quantity", Number(quantity));
    formData.append("dozen", dozen);
    formData.append("carton", carton);
    formData.append("description", description);
    formData.append("image", productImage);
    formData.append("approved", approved);
    formData.append("adminApproved", JSON.stringify(adminApproved)); // Convert adminApproved object to JSON string

    console.log(...formData);
    console.log('selected',selectedProductValue)

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        //saveProduct={handleSaveProduct} 
        setSelectedProductValue={setSelectedProductValue}
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
