import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const filteredProducts = useSelector(selectFilteredPoducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  // Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  return (
    <div className="product-list">
      <hr />
      <div className="--flex-between --flex-dir-column">
        <span>
          <h3>Inventory Items</h3>
        </span>
        <span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </span>
      </div>

      {isLoading && <SpinnerImg />}

      <div className="table">
        <h3>Unapproved Products</h3>
        <table>
          {/* Table Header */}
          <thead>
            <tr>
              <th>s/n</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentItems
              .filter((product) => !product.approved)
              .map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{shortenText(product.name, 16)}</td>
                  <td>{product.category}</td>
                  <td>{"$" + product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{"$" + product.price * product.quantity}</td>
                  <td className="icons">
                    <span>
                      <Link to={`/product-detail/${product._id}`}>
                        <AiOutlineEye size={25} color={"purple"} />
                      </Link>
                    </span>
                    <span>
                      <Link to={`/edit-product/${product._id}`}>
                        <FaEdit size={20} color={"green"} />
                      </Link>
                    </span>
                    <span>
                      <FaTrashAlt
                        size={20}
                        color={"red"}
                        onClick={() => confirmDelete(product._id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Pagination */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
        {/* End Pagination */}
      </div>

      <div className="table">
        <h3>Approved Products</h3>
        <table>
          {/* Table Header */}
          <thead>
            <tr>
              <th>s/n</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentItems
              .filter((product) => product.approved)
              .map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{shortenText(product.name, 16)}</td>
                  <td>{product.category}</td>
                  <td>{"$" + product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{"$" + product.price * product.quantity}</td>
                  <td className="icons">
                    <span>
                      <Link to={`/product-detail/${product._id}`}>
                        <AiOutlineEye size={25} color={"purple"} />
                      </Link>
                    </span>
                    <span>
                      <Link to={`/edit-product/${product._id}`}>
                        <FaEdit size={20} color={"green"} />
                      </Link>
                    </span>
                    <span>
                      <FaTrashAlt
                        size={20}
                        color={"red"}
                        onClick={() => confirmDelete(product._id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Pagination */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
        {/* End Pagination */}
      </div>
    </div>
  );
};

export default ProductList;
