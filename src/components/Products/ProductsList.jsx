import { Loader } from "../Loader";
import { NotFoundProducts } from "./NotFoundProducts";
import { ProductItem } from "./ProductItem";

export const ProductsList = ({
  products,
  onModalShow,
  onDeleteProduct,
  isLoading,
  showLoadMoreBtn,
  onLoadMore,
}) => {
  if (!products.length) {
    return <NotFoundProducts />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className=" h-custom" style={{ padding: "40px 0" }}>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {products.map((product) => (
          <ProductItem
            onDeleteProduct={onDeleteProduct}
            onModalShow={onModalShow}
            key={product.id}
            {...product}
          />
        ))}
      </ul>

      {products.length > 0 && showLoadMoreBtn && (
        <button
          type="button"
          onClick={onLoadMore}
          style={{ display: "flex", margin: "0 auto" }}
        >
          Load more
        </button>
      )}
    </section>
  );
};
