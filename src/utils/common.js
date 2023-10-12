export const isEmpty = (obj) => {
  return Object.keys(obj).length > 0 ? false : true;
};

export const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const generateProductByIdObj = (products = []) => {
  const obj = {};
  products.forEach((product) => {
    obj[product.id] = {
      ...product,
    };
  });
  return obj;
};

export const getStatus = (productData, originalProductsDataById) => {
  let status = "";
  if(+productData.price !== +originalProductsDataById[productData.id].price) {
    status = "Price Updated";
  }
  if(+productData.quantity !== +originalProductsDataById[productData.id].quantity) {
    status = "Quantity Updated";
  }
  if(+productData.price !== +originalProductsDataById[productData.id].price && +productData.quantity !== +originalProductsDataById[productData.id].quantity) {
    status = "Price + Quantity Updated";
  }
  return status;
}

