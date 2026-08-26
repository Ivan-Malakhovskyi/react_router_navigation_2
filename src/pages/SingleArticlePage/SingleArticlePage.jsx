import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import defaultImg from "../NotFoundPage/pulp-fiction-john-travolta.gif";

import { Loader } from "@/components/Loader";
import { getSingeArticleService } from "@/services/articlesServices";

const SingleArticlePage = () => {
  const { articleId } = useParams();

  const location = useLocation();

  const prevLocation = location.state?.from ?? "/articles";

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticleById = async () => {
      setIsLoading(true);
      try {
        const resp = await getSingeArticleService(articleId);
        setArticle(resp);
      } catch (error) {
        toast.error("Something went wrong!", error);
      } finally {
        setIsLoading(false);
      }
    };

    getArticleById();
  }, [articleId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    article && (
      <>
        <Link
          to={prevLocation}
          className="btn btn-primary my-3"
          style={{
            border: "1px solid #ccc",
            color: "#fff",
            backgroundColor: "blue",
            padding: "12px 16px",
            borderRadius: "8px",
            display: "inline-block",
            marginBottom: "30px",
          }}
        >
          ⬅️ Back to articles
        </Link>
        <img
          src={article.urlToImage || defaultImg}
          alt={article.title}
          className="img-fluid mb-4"
          style={{ maxHeight: "300px", maxWidth: "100%", objectFit: "cover" }}
        />
        <h1 className="mb-5">{article.title}</h1>

        <div>{article.description}</div>

        <Link
          to="comments"
          state={location.state}
          className="btn btn-primary my-4"
        >
          Vew post comments
        </Link>
        <Outlet />
      </>
    )
  );
};

export default SingleArticlePage;
