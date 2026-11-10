import { Navigate, Route, Routes } from "react-router";
import { lazy } from "react";

import { Layout } from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));
const SingleArticlePage = lazy(() => import("./pages/SingleArticlePage"));
const CommentsPage = lazy(
  () => import("./pages/SingleArticlePage/CommentsPage"),
);
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ExercisesPage = lazy(() => import("./pages/ExercisesPage"));
const ProductsPage = lazy(() => import("./pages/ExercisesPage/ProductsPage"));
const CounterPage = lazy(() => import("./pages/ExercisesPage/CounterPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="articles" element={<ArticlesPage />} />

        <Route path="articles/:articleId" element={<SingleArticlePage />}>
          <Route path="comments" element={<CommentsPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />

        <Route path="exercises" element={<ExercisesPage />}>
          <Route index element={<Navigate to="products" />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="counter" element={<CounterPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
