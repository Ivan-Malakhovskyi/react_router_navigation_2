import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  params: {
    apiKey: "8cb01996c0d34dbebd5fe5c1bf4080cf",
    pageSize: 6,
    searchIn: "title",
  },
});

export const getArticles = async (query, page = 1) => {
  const { data } = await axiosInstance.get("everything", {
    params: { q: query || "javascript", page },
  });
  return data;
};

export const getSingeArticleService = async (query) => {
  const { data } = await axiosInstance.get("everything", {
    params: {
      q: query,
      searchIn: "title",
      pageSize: 4,
    },
  });
  return data.articles[0];
};
