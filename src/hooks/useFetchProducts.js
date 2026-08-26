import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteProductById, getAllProducts } from "@/services/productsService";
import productsJson from "@/data/products.json";

export const useFetchProducts = (offset = 10) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEndOfProducts, setIsEndOfProducts] = useState(false);
  const [isError, setIsError] = useState(null);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);
  const controller = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      if (controller.current) {
        controller.current?.abort();
      }

      try {
        controller.current = new AbortController();

        setLoading(true);
        const resp = await getAllProducts(controller, 10, offset);
        if (resp && Number(resp.total) <= Number(resp.skip)) {
          setLoading(false);
          setIsEndOfProducts(true);
          setShowLoadMoreBtn(false);
          toast.success("End of list");
          return;
        }
        setProducts(resp.products);
      } catch (error) {
        if (axios.isCancel(error)) {
          setIsError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [offset]);

  const handleDeleteProduct = async (productId) => {
    try {
      const resp = await deleteProductById(productId);
      if (resp.isDeleted) {
        setProducts((prev) => prev.filter(({ id }) => id !== productId));
        toast.success("Successfully deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = () => {
    const randomIndex = Math.floor(Math.random() * productsJson.length);
    setProducts((prev) => [
      { ...productsJson[randomIndex], id: Date.now() },
      ...prev,
    ]);
  };

  return {
    products,
    isLoading,
    showLoadMoreBtn,
    isEndOfProducts,
    isError,
    handleDeleteProduct,
    handleAddProduct,
  };
};
