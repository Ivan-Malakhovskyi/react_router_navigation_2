import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getAllProducts = async (controller, limit = 10, skip = 0) => {
  const { data } = await axiosInstance.get(
    `/products/?limit=${limit}&skip=${skip}`,
    { signal: controller.current?.signal },
  );
  return data;
};

export const deleteProductById = async (id) => {
  const resp = await axiosInstance.delete(`/products/${id}`);
  return resp.data;
};
