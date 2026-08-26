import { useSearchParams } from "react-router";
import { useCallback, useMemo } from "react";

import { useFetch } from "@/hooks/useFetch";
import { getArticles } from "@/services/articlesServices";
import { ArticlesNotFound } from "@/components/Articles/ArticlesNotFound/ArticlesNotFound";
import { Button } from "@/components/Button";
import { ArticlesItem } from "@/components/Articles/ArticlesItem";
import { ArticlesSearch } from "@/components/Articles/ArticlesSearch";
import { ArticlesLoader } from "@/components/Articles/ArticlesLoader";
import { ArticlesError } from "@/components/Articles/ArticlesError/ArticlesError";
import { fetchStatus } from "@/constants/fetchStatus";
import { toast, ToastContainer } from "react-toastify";

export const ArticlesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const query = searchParams.get("search") ?? "";

  const queryParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams],
  );

  const fetchArticles = useCallback(
    () => getArticles(query, page),
    [page, query],
  );

  const { data, status } = useFetch(fetchArticles);

  if (status === fetchStatus.Loading || status === fetchStatus.Idle) {
    return <ArticlesLoader />;
  }

  if (status === fetchStatus.Error) {
    return <ArticlesError />;
  }

  const { articles } = data;

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const search = e.target.elements.search.value.trim();

    if (!search) {
      toast.error("Empty search");
      return;
    }

    setSearchParams({ search, page });
    e.target.reset();
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchParams({});
    e.currentTarget.form.reset();
  };

  const isSearchEmpty = articles.length === 0 && query;

  return (
    <>
      <ArticlesSearch
        onSubmitSearch={handleSubmitSearch}
        handleReset={handleReset}
      />
      <div className="container-fluid g-0">
        <div className="row">
          {!isSearchEmpty ? (
            articles?.map((article) => (
              <ArticlesItem key={article.url} article={article} />
            ))
          ) : (
            <ArticlesNotFound />
          )}
        </div>
      </div>

      {articles.length !== 0 && (
        <div className="pagination">
          <div className="btn-group my-4 mx-auto btn-group-lg">
            {[...Array(5)].map((_, index) => (
              <Button
                onClick={() =>
                  setSearchParams({ ...queryParams, page: index + 1 })
                }
                disabled={index + 1 === page}
                key={index}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};
