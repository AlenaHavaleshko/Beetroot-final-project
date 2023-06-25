import axios from "./axios";


export const getProductsList = async () => {
  const resp = await axios.get("/products");

  return resp.data;
}

export const postNewProduct = async (data) => {
  const resp = await axios.post("/products", data);

  return resp.data;
}


export const getSingleProduct = async (productId) => {
  const resp = await axios.get(`/products/${productId}`);

  return resp.data;
}