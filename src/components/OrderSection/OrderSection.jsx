import React, { useEffect } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../redux/slice/orderSlice";

const OrderSection = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.order);
  
  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  return (
    <>
      <OrderDetails />
      <Products />
    </>
  );
};

export default OrderSection;
