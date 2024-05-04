import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import Select from "react-select";
import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  // Add a prop to capture the selected product value
  setSelectedProductValue,
}) => {
  // Define state variable for selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Define product options
  const productOptions = [
    { label: "Product One", value: "One" },
    { label: "Product Two", value: "Two" },
    { label: "Product Three", value: "Three" },
    { label: "Product Four", value: "Four" },
    { label: "Product Five", value: "Five" },
    // Add more options as needed
  ];

  // Handle change in selected product
  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
    // Call the function to set the selected product value in the parent component
    setSelectedProductValue(selectedOption.value);
  };

  console.log(selectedProduct)
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <Select
            name="name"
            value={selectedProduct} // Change this line to use selectedProduct state
            onChange={handleProductChange}
            options={productOptions}
            placeholder="Select Product Name"
            isSearchable
            autoFocus
          />

          <label>Product Price per PC:</label>
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Quantity in PCS:</label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <label>PCS per dozen:</label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="dozen"
            value={product?.dozen}
            onChange={handleInputChange}
          />
          <label>PCS per carton:</label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="carton"
            value={product?.carton}
            onChange={handleInputChange}
          />
          
          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
