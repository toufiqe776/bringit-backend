
import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data.data;
};

export const createProduct = async (product) => {
  const response = await api.post("/products", product);
  return response.data.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Upload image to backend
export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post(
    "/products/upload-image",
    formData
  );

  return response.data.image_url;
};
