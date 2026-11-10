import axios from "axios";

axios.defaults.baseURL = "https://newsdata.io/api/1/latest";
const axiosInstance = axios.create({
  baseURL: "https://newsdata.io/api/1",
});

const token = "pub_8940b1e8d5234361a3697628cf0bb258";

export const fetchBlogs = async (query = "cats") => {
  const params = new URLSearchParams({ apikey: token, qInTitle: query });
  console.log(params);
  const resp = await axiosInstance.get(`/latest?${params}`);
  console.log(resp);
  return resp.data;
};
