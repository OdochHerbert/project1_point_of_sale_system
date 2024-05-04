import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";

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
    </div>
  );
};

export default Dashboard;
