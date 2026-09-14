import { Link, Navigate, Route, Routes } from "react-router-dom";
import { SearchPage } from "./pages/searchPage/SearchPage";
import { UserPage } from "./pages/userPage/UserPage";
import styles from "./App.module.css";

function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p>Страница не найдена.</p>
      <Link className={styles.backLink} to="/search">
        ← Back to search
      </Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/users/:login" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
