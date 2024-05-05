import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductList2 from "../../components/product/productSummary/productList2";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
   // Filter products based on approval status
   const approvedProducts = products.filter((product) => product.approved===true);
   const unapprovedProducts = products.filter((product) => product.approved===false);

   //Removed from return
    /*<ProductList products={products} products1={true} isLoading={isLoading} />
      <ProductList products={products} products1={false} isLoading={isLoading}/>
    */
    
  

  return (
    <div>
      <ProductSummary products={products} />   
      <ProductList2>
          {({ products, loading, error }) => (
            <div>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                <div>
                  <h1>Product List</h1>
                  <ul>
                    {products.map(product => (
                      <li key={product._id}>
                        <h2>{product.name}</h2>
                        <p>SKU: {product.sku}</p>
                        <p>Carton: {product.carton}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ${product.price}</p>
                        <p>Dozen: {product.dozen}</p>
                        <p>Description: {product.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </ProductList2>

    </div>
  );
};

export default Dashboard;
