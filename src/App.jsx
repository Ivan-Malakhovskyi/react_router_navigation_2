import { Navigate, Route, Routes } from "react-router";

import { Layout } from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import CommentsPage from "./pages/SingleArticlePage/CommentsPage";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ExercisesPage from "./pages/ExercisesPage";
import ProductsPage from "./pages/ExercisesPage/ProductsPage";
import CounterPage from "./pages/ExercisesPage/CounterPage";

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
