import { useState, useRef, useMemo } from "react";
import { FiPlus } from "react-icons/fi";

import { InStockFilter } from "./InStockFilter";
import { SearchInput } from "./SearchInput";
import { CategoryFilter } from "./CategoryFilter";
import productsJson from "@/data/products.json";
import { ProductsList } from "./ProductsList";
import { Modal } from "@/components/Modal";
import { Cart } from "@/components/Cart";
import { useFetchProducts } from "@/hooks/useFetchProducts";

export const Products = () => {
  // const [products, setProducts] = useState(() =>
  //   getLocalData(PRODUCTS_LOCALSTORAGE_KEY, undefined, productsJson),
  // );
  // const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(10);
  // const [isEndOfProducts, setIsEndOfProducts] = useState(false);
  // const [isError, setIsError] = useState(null);
  // const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isInStock, setIsInStock] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const modalProduct = useRef();
  // const controller = useRef(null);

  const {
    products,
    isLoading,
    showLoadMoreBtn,
    isError,
    handleAddProduct,
    handleDeleteProduct,
  } = useFetchProducts(offset);

  const handleChangeSearch = (event) => setSearch(event.target.value);

  const handleResetSearch = () => setSearch("");

  const handleChangeCategory = (event) => setCategory(event.target.value);

  const handleChangeInStock = () => setIsInStock((prev) => !prev);

  const handleModalShow = (productId) => {
    setIsModalShow(true);
    modalProduct.current = products.find(({ id }) => id === productId);
  };

  const handleModalClose = () => {
    setIsModalShow(false);
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + 10);
  };

  const filteredProducts = useMemo(() => {
    console.log("applyFilters");
    let filteredProducts = [...products];
    filteredProducts = filteredProducts.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase().trim()),
    );
    return filteredProducts;
  }, [products, search]);

  return (
    <>
      <div className="d-flex align-items-center mb-5">
        <InStockFilter
          isChecked={isInStock}
          onChangeInStock={handleChangeInStock}
        />
        <CategoryFilter
          category={category}
          onChangeCategory={handleChangeCategory}
        />
        <button
          type="button"
          className="btn btn-primary btn-lg ms-auto"
          onClick={handleAddProduct}
        >
          <FiPlus />
        </button>
      </div>
      <SearchInput
        search={search}
        onChangeSearch={handleChangeSearch}
        onResetSearch={handleResetSearch}
      />
      <ProductsList
        products={filteredProducts}
        onDeleteProduct={handleDeleteProduct}
        onModalShow={handleModalShow}
        onLoadMore={handleLoadMore}
        showLoadMoreBtn={showLoadMoreBtn}
        isLoading={isLoading}
      />

      {isModalShow && (
        <Modal onModalClose={handleModalClose}>
          <Cart {...modalProduct.current} defaultCounter={1} />
        </Modal>
      )}
    </>
  );
};
